import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { TreeInternalComponent } from '../src/tree-internal.component';
import { TreeComponent } from '../src/tree.component';
import { TreeModel } from '../src/tree.types';
import { TreeService } from '../src/tree.service';
import { TreeController } from '../src/tree-controller';
import { NodeMenuService } from '../src/menu/node-menu.service';
import { NodeMenuComponent } from '../src/menu/node-menu.component';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { NodeDraggableDirective } from '../src/draggable/node-draggable.directive';
import { NodeEditableDirective } from '../src/editable/node-editable.directive';
import { TreeStatus } from '../src/tree.types';
import * as EventUtils from '../src/utils/event.utils';
import { SafeHtmlPipe } from '../src/utils/safe-html.pipe';
import { Ng2TreeSettings, Tree } from '../index';
import { isEmpty } from '../src/utils/fn.utils';

let fixture: ComponentFixture<TestComponent>;
let lordTreeInstance: TreeComponent;
let lordInternalTreeNative: HTMLElement;
let lordInternalTreeInstance: TreeInternalComponent;
let lordInternalTreeDebugElement: DebugElement;

let nodeMenuService: NodeMenuService;
let nodeDraggableService: NodeDraggableService;
let treeService: TreeService;

const treeLord: TreeModel = {
  value: 'Lord',
  id: 1,
  children: [
    {
      value: 'Disciple#1',
      id: 2,
      loadChildren(onLoaded) {
        onLoaded([{ value: 'Newborn#1' }, { value: 'Newborn#2' }]);
      }
    },
    {
      value: 'Disciple#2',
      id: 3,
      children: [{ value: 'SubDisciple#1', id: 4 }, { value: 'SubDisciple#2', id: 5 }]
    }
  ]
};

@Component({
  template: `
  <div><tree id="lord" #lordTreeComponent [tree]="treeLord" [settings]="settings"></tree></div>
`
})
class TestComponent {
  public settings = new Ng2TreeSettings();
  public treeLord: TreeModel = treeLord;

  @ViewChild('lordTreeInstance') public lordTreeComponent;

  public constructor(public treeHolder: ElementRef) {
    this.settings.enableCheckboxes = true;
    this.settings.showCheckboxes = true;
  }
}

describe('TreeController', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        TreeInternalComponent,
        TreeComponent,
        NodeEditableDirective,
        NodeMenuComponent,
        NodeDraggableDirective,
        SafeHtmlPipe
      ],
      providers: [NodeMenuService, NodeDraggableService, TreeService, SafeHtmlPipe]
    });

    fixture = TestBed.createComponent(TestComponent);

    lordInternalTreeDebugElement = fixture.debugElement.query(By.directive(TreeInternalComponent));
    lordTreeInstance = fixture.componentInstance.lordTreeComponent;
    lordInternalTreeInstance = lordInternalTreeDebugElement.componentInstance;
    lordInternalTreeNative = lordInternalTreeDebugElement.nativeElement;

    treeService = lordInternalTreeInstance.treeService;

    nodeMenuService = TestBed.get(NodeMenuService);
    nodeDraggableService = TestBed.get(NodeDraggableService);

    fixture.detectChanges();
  });

  it('should have properly set tree controller property', () => {
    expect(treeService.getController(lordInternalTreeInstance.tree.id)).toBeDefined();
  });

  it('can check a node', () => {
    const controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isChecked()).toBe(false);

    controller.check();

    fixture.detectChanges();

    expect(controller.isChecked()).toBe(true);
  });

  it('can uncheck a node', () => {
    const controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isChecked()).toBe(false);

    controller.check();
    fixture.detectChanges();

    controller.uncheck();
    fixture.detectChanges();

    expect(controller.isChecked()).toBe(false);
  });

  it('forbids selection', () => {
    const controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isSelectionAllowed()).toBe(true);

    controller.forbidSelection();

    fixture.detectChanges();

    expect(controller.isSelectionAllowed()).toBe(false);
  });

  it('allows selection', () => {
    const controller = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(controller.isSelectionAllowed()).toBe(true);

    controller.forbidSelection();
    fixture.detectChanges();

    expect(controller.isSelectionAllowed()).toBe(false);

    controller.allowSelection();
    fixture.detectChanges();

    expect(controller.isSelectionAllowed()).toBe(true);
  });

  it('checks all the children down the branch', () => {
    const tree = lordInternalTreeInstance.tree;
    const controller = treeService.getController(tree.id);

    controller.check();
    fixture.detectChanges();

    const checkChildChecked = (children: Tree[], checked: boolean) =>
      isEmpty(children)
        ? checked
        : children.every(child => child.checked && checkChildChecked(child.children, child.checked));

    expect(checkChildChecked(tree.children, tree.checked)).toBe(true, 'All the children should be checked');
  });

  it('unchecks all the children down the branch', () => {
    const tree = lordInternalTreeInstance.tree;
    const controller = treeService.getController(tree.id);

    controller.check();
    fixture.detectChanges();

    controller.uncheck();
    fixture.detectChanges();

    const checkChildChecked = (children: Tree[], checked: boolean) =>
      isEmpty(children)
        ? checked
        : children.every(child => child.checked && checkChildChecked(child.children, child.checked));

    expect(checkChildChecked(tree.children, tree.checked)).toBe(false, 'All the children should be unchecked');
  });

  it(
    'detects indetermined node',
    fakeAsync(() => {
      const tree = lordInternalTreeInstance.tree;
      const controller = treeService.getController(tree.id);
      const childController = treeService.getController(tree.children[0].id);

      childController.check();
      fixture.detectChanges();
      tick();

      expect(childController.isChecked()).toBe(true, 'Node should be checked');
      expect(controller.isIndetermined()).toBe(true, 'Node should be in indetermined state');
    })
  );

  it('knows when node is selected', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordController.isSelected()).toBe(false);

    clickOn(lordInternalTreeDebugElement, event);
    fixture.detectChanges();

    expect(lordController.isSelected()).toBe(true);
  });

  it('knows how to select a node', () => {
    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordController.isSelected()).toBe(false);

    lordController.select();

    fixture.detectChanges();

    expect(lordController.isSelected()).toBe(true);
  });

  it('selects a node only if it is not already selected', () => {
    spyOn(treeService.nodeSelected$, 'next');

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);

    lordController.select();
    lordController.select();
    lordController.select();

    fixture.detectChanges();

    expect(lordController.isSelected()).toBe(true);
    expect(treeService.nodeSelected$.next).toHaveBeenCalledTimes(1);
  });

  it('knows how to collapse a node', () => {
    spyOn(treeService.nodeCollapsed$, 'next');

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);

    expect(lordController.isCollapsed()).toEqual(false);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);

    lordController.collapse();
    fixture.detectChanges();

    expect(lordController.isCollapsed()).toEqual(true);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(0);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });

  it('collapses a node only if it is expanded', () => {
    spyOn(treeService.nodeCollapsed$, 'next');

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);

    lordController.collapse();
    lordController.collapse();
    lordController.collapse();

    fixture.detectChanges();

    expect(lordController.isCollapsed()).toBe(true);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });

  it('knows how to expand a node', () => {
    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);

    lordController.collapse();
    fixture.detectChanges();

    spyOn(treeService.nodeExpanded$, 'next');

    expect(lordController.isExpanded()).toEqual(false);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(0);

    lordController.expand();
    fixture.detectChanges();

    expect(lordController.isExpanded()).toEqual(true);
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
  });

  it('expands a node only if it is collapsed', () => {
    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);

    lordController.collapse();
    fixture.detectChanges();

    lordController.expand();
    lordController.expand();

    expect(lordController.isExpanded()).toBe(true);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });

  it('knows how to rename a node', () => {
    expect(nodeNameOf(lordInternalTreeDebugElement)).toEqual('Lord');

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);

    lordController.rename('Master Lord');
    fixture.detectChanges();

    expect(nodeNameOf(lordInternalTreeDebugElement)).toEqual('Master Lord');
  });

  it('knows how to remove a node', () => {
    const child = firstChildOf(lordInternalTreeDebugElement);
    expect(nodeNameOf(child)).toEqual('Disciple#1');
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);

    const childController = treeService.getController(child.componentInstance.tree.id);

    childController.remove();

    fixture.detectChanges();

    expect(nodeNameOf(firstChildOf(lordInternalTreeDebugElement))).toEqual('Disciple#2');
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(3);
  });

  it('knows how to add a new child', () => {
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);

    const childController = treeService.getController(lordInternalTreeInstance.tree.id);

    childController.addChild({
      value: 'N',
      children: [{ value: 'N1' }, { value: 'N2' }]
    });

    fixture.detectChanges();

    const children = childrenOf(lordInternalTreeDebugElement);
    expect(nodeNameOf(children[6])).toEqual('N2');
    expect(children.length).toEqual(7);
  });

  it('does not add a child if async children of the target node were not loaded', () => {
    const child = childrenOf(lordInternalTreeDebugElement)[0];

    expect(child.componentInstance.tree.value).toEqual('Disciple#1');
    expect(childrenOf(child).length).toEqual(0);

    const childController = treeService.getController(child.componentInstance.tree.id);

    childController.addChild({ value: 'N' });

    fixture.detectChanges();

    expect(childrenOf(child).length).toEqual(0);
  });

  it('knows how to change node id', () => {
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);

    const childController = treeService.getController(lordInternalTreeInstance.tree.id);

    childController.changeNodeId('Boom!');

    expect(lordInternalTreeInstance.tree.id).toEqual('Boom!');
    expect(childController).toBe(treeService.getController('Boom!'));
  });

  it('throws an error if new id is not given', () => {
    const childController = treeService.getController(lordInternalTreeInstance.tree.id);

    try {
      childController.changeNodeId(null);
      fail('Should throw an error if id is not given');
    } catch (error) {
      expect(error.message).toEqual('You should supply an id!');
    }
  });

  it('throws an error if controller for a given id already exists', () => {
    const childController = treeService.getController(lordInternalTreeInstance.tree.id);

    try {
      childController.changeNodeId(lordInternalTreeInstance.tree.id);
      fail('Should throw an error if controller for a given id already exists');
    } catch (error) {
      expect(error.message).toEqual(`Controller already exists for the given id: 1`);
    }
  });

  it('knows how to reload async children', () => {
    spyOn(lordInternalTreeInstance.tree, 'reloadChildren');

    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    lordController.reloadChildren();

    expect(lordInternalTreeInstance.tree.reloadChildren).toHaveBeenCalledTimes(1);
  });

  it('knows how to set children for a node', () => {
    expect(childrenOf(lordInternalTreeDebugElement).length).toEqual(4);

    const childController = treeService.getController(lordInternalTreeInstance.tree.id);

    childController.setChildren([{ value: 'N1' }, { value: 'N2' }]);

    fixture.detectChanges();

    const children = childrenOf(lordInternalTreeDebugElement);
    expect(children.length).toEqual(2);
    expect(children[0].componentInstance.tree.value).toEqual('N1');
    expect(children[1].componentInstance.tree.value).toEqual('N2');
  });

  it('does not set children for the leaf', () => {
    const children = childrenOf(lordInternalTreeDebugElement);
    expect(children.length).toEqual(4);

    const child = children[3];
    expect(child.componentInstance.tree.value).toEqual('SubDisciple#2');
    expect(child.componentInstance.tree.hasChildren()).toBe(false);

    const childController = treeService.getController(child.componentInstance.tree.id);

    childController.setChildren([{ value: 'N1' }, { value: 'N2' }]);

    fixture.detectChanges();

    expect(childrenOf(child).length).toEqual(0);
  });

  it('knows how to transfer a node into a BeingRenamed state', () => {
    const lordController = treeService.getController(lordInternalTreeInstance.tree.id);
    expect(lordInternalTreeInstance.tree.isBeingRenamed()).toEqual(false);

    lordController.startRenaming();

    fixture.detectChanges();

    expect(lordInternalTreeInstance.tree.isBeingRenamed()).toEqual(true);
  });

  it('knows how to convert a tree to tree model', () => {
    const model = { value: 'bla' };

    const tree: any = {
      toTreeModel: jasmine.createSpy('tree.toTreeModel').and.returnValue(model)
    };

    const controller = new TreeController({ tree, treeService: null } as any);

    const actualModel = controller.toTreeModel();

    expect(actualModel).toBe(model);
  });
});

function nodeNameOf(internalTreeDebugElement: DebugElement): string {
  return internalTreeDebugElement.query(By.css('.node-name')).nativeElement.innerHTML;
}

function nodeValueElementOf(internalTreeDebugElement: DebugElement): DebugElement {
  return internalTreeDebugElement.query(By.css('.node-value'));
}

function childrenOf(internalTreeDebugElement: DebugElement): DebugElement[] {
  return internalTreeDebugElement.queryAll(By.directive(TreeInternalComponent));
}

function firstChildOf(internalTreeDebugElement: DebugElement): DebugElement {
  return internalTreeDebugElement.query(By.directive(TreeInternalComponent));
}

function clickOn(internalTreeDebugElement: DebugElement, event: any): void {
  nodeValueElementOf(internalTreeDebugElement).triggerEventHandler('click', event);
}
