import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild, ElementRef, DebugElement } from '@angular/core';
import { TreeInternalComponent } from '../src/tree-internal.component';
import { TreeComponent } from '../src/tree.component';
import { TreeModel, Ng2TreeSettings } from '../src/tree.types';
import { TreeService } from '../src/tree.service';
import { TreeController } from '../src/tree-controller';
import { NodeMenuService } from '../src/menu/node-menu.service';
import { NodeMenuComponent } from '../src/menu/node-menu.component';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { NodeDraggableDirective } from '../src/draggable/node-draggable.directive';
import { NodeEditableDirective } from '../src/editable/node-editable.directive';
import { NodeMenuAction } from '../src/menu/menu.events';
import * as EventUtils from '../src/utils/event.utils';
import { CapturedNode } from '../src/draggable/captured-node';
import { SafeHtmlPipe } from '../src/utils/safe-html.pipe';

let fixture;
let lordInternalTreeEl;
let lordComponent;
let lordComponentInstance;
let lordTreeComponent;
let faceInternalTreeEl;
let faceComponentInstance;
let faceTreeComponent;
let nodeMenuService;
let nodeDraggableService;
let treeService;
let safeHtml;

const treeLord: TreeModel = {
  value: 'Lord',
  id: 1,
  children: [
    {
      value: 'Disciple#1',
      id: 2
    },
    {
      value: 'Disciple#2',
      id: 3,
      children: [
        {value: 'SubDisciple#1', id: 4},
        {value: 'SubDisciple#2', id: 5}
      ]
    }
  ]
};

const treeFace: TreeModel = {
  value: 'Face',
  id: 1,
  children: [
    {
      value: 'Eyes',
      id: 2,
      children: [
        {value: 'Retina', id: 3},
        {value: 'Eyebrow', id: 4}
      ]
    },
    {value: 'Lips', id: 5}
  ]
};

@Component({
  template: `
  <div><tree id="lord" #lordTreeComponent [tree]="treeLord"></tree></div>
  <div><tree id="face" #faceTreeComponent [tree]="treeFace"></tree></div>
`
})
class TestComponent {
  public treeLord: TreeModel = treeLord;
  public treeFace: TreeModel = treeFace;

  @ViewChild('lordTreeComponent') public lordTreeComponent;
  @ViewChild('faceTreeComponent') public faceTreeComponent;

  public constructor(public treeHolder: ElementRef) {
  }
}

describe('TreeController', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TreeInternalComponent, TreeComponent, NodeEditableDirective, NodeMenuComponent, NodeDraggableDirective, SafeHtmlPipe],
      providers: [NodeMenuService, NodeDraggableService, TreeService, SafeHtmlPipe]
    });

    fixture = TestBed.createComponent(TestComponent);

    lordInternalTreeEl = fixture.debugElement.query(By.css('#lord')).query(By.directive(TreeInternalComponent));
    lordComponent = fixture.lordTreeComponent;
    lordComponentInstance = lordInternalTreeEl.componentInstance;
    lordTreeComponent = fixture.componentInstance.lordTreeComponent;

    faceInternalTreeEl = fixture.debugElement.query(By.css('#face')).query(By.directive(TreeInternalComponent));
    faceComponentInstance = faceInternalTreeEl.componentInstance;
    faceTreeComponent = fixture.componentInstance.faceTreeComponent;

    nodeMenuService = TestBed.get(NodeMenuService);
    nodeDraggableService = TestBed.get(NodeDraggableService);
    treeService = TestBed.get(TreeService);
    safeHtml = TestBed.get(SafeHtmlPipe);

    fixture.detectChanges();
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
    expect(nodeDraggableService).not.toBeNull();
    expect(treeService).not.toBeNull();
    expect(safeHtml).not.toBeNull();
  });

  it('should have properly set tree controller property', () => {
    expect(lordComponentInstance).toBeDefined();
    expect(lordTreeComponent).toBeDefined();
    expect(faceComponentInstance).toBeDefined();
    expect(faceTreeComponent).toBeDefined();
  });

  it('should isSelected return true when node is selected', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Left;

    const allNodeValues: DebugElement[] = lordInternalTreeEl.queryAll(By.css('.node-value'));

    expect(allNodeValues[0].nativeElement.innerText).toEqual('Lord');

    allNodeValues[0].triggerEventHandler('click', event);

    fixture.detectChanges();

    expect(lordComponentInstance.isSelected).toEqual(true);
    expect(lordTreeComponent.getController().isSelected()).toEqual(true);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(true);

    allNodeValues[1].triggerEventHandler('click', event);

    fixture.detectChanges();
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(false);
    expect(lordTreeComponent.getController().isSelected()).toEqual(false);
  });

  it('should select method selects node', () => {
    const allNodeValues: DebugElement[] = lordInternalTreeEl.queryAll(By.css('.node-value'));

    const servantNumber1El = allNodeValues[1].parent.parent.parent.parent;
    const servantNumber2El = allNodeValues[2].parent.parent.parent.parent;

    //lordTreeComponent.getController().select();

/*
    expect(lordComponentInstance.isSelected).toEqual(true);
    expect(lordTreeComponent.getController().isSelected()).toEqual(true);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(true);

    expect(servantNumber1El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[1].nativeElement.classList.contains('node-selected')).toEqual(false);

    expect(servantNumber2El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[2].nativeElement.classList.contains('node-selected')).toEqual(false);

    lordTreeComponent.getControllerById(3).select();
    expect(lordComponentInstance.isSelected).toEqual(false);
    expect(lordTreeComponent.getController().isSelected()).toEqual(false);
    expect(allNodeValues[0].nativeElement.classList.contains('node-selected')).toEqual(false);

    expect(servantNumber1El.componentInstance.isSelected).toEqual(false);
    expect(allNodeValues[1].nativeElement.classList.contains('node-selected')).toEqual(false);

    expect(servantNumber2El.componentInstance.isSelected).toEqual(true);
    expect(allNodeValues[2].nativeElement.classList.contains('node-selected')).toEqual(true);
    expect(lordTreeComponent.getControllerById(3).isSelected()).toEqual(true);
    */
  });

  it('should isCollapsed return true when node is collapsed', () => {
    const foldingControl = lordInternalTreeEl.query(By.css('.folding'));
    spyOn(lordComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(lordComponentInstance.treeService.nodeCollapsed$, 'next');

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    expect(lordTreeComponent.getController().isCollapsed()).toEqual(false);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(lordTreeComponent.getController().isCollapsed()).toEqual(true);
    expect(lordComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(lordComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    const children = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(0);
  });

  it('should be possible to collapse node', () => {
    const foldingControl = lordInternalTreeEl.query(By.css('.folding'));
    spyOn(lordComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(lordComponentInstance.treeService.nodeCollapsed$, 'next');

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(lordComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(lordComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    const children = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(0);
  });

  it('should isExpanded to return true when node is expanded', () => {
    const foldingControl = lordInternalTreeEl.query(By.css('.folding'));
    spyOn(lordComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(lordComponentInstance.treeService.nodeCollapsed$, 'next');

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    expect(lordTreeComponent.getController().isExpanded()).toEqual(true);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();
    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(lordTreeComponent.getController().isExpanded()).toEqual(false);
    expect(lordComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(lordComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    const children = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(0);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    expect(lordComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(lordComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });

  it('should be possible to expand node', () => {
    const foldingControl = lordInternalTreeEl.query(By.css('.folding'));
    spyOn(lordComponentInstance.treeService.nodeExpanded$, 'next');
    spyOn(lordComponentInstance.treeService.nodeCollapsed$, 'next');

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();
    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(false);
    expect(lordComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(0);
    expect(lordComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);

    const children = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(children.length).toEqual(0);

    foldingControl.triggerEventHandler('click');

    fixture.detectChanges();

    expect(lordInternalTreeEl.componentInstance.tree.isNodeExpanded()).toEqual(true);
    expect(lordComponentInstance.treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(lordComponentInstance.treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
  });

  /*
  it('should drag node to the tree (though technically every node IS a tree)', () => {
    const internalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant1InternalTreeEl = internalTreeChildren[0];
    const servant2InternalTreeEl = internalTreeChildren[1];

    expect(servant1InternalTreeEl.componentInstance.tree.value).toEqual('Servant#1');
    expect(servant1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);

    expect(servant2InternalTreeEl.componentInstance.tree.value).toEqual('Servant#2');
    expect(servant2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);

    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#2');

    const capturedNode = new CapturedNode(servant1InternalTreeEl.componentInstance.element, servant1InternalTreeEl.componentInstance.tree);
    nodeDraggableService.fireNodeDragged(capturedNode, servant2InternalTreeEl.componentInstance.element);

    fixture.detectChanges();

    expect(servant1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(servant2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);

    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');

    const masterElement = fixture.debugElement.nativeElement;
    const nodeValues = masterElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Master');
    expect(nodeValues[1].innerText).toEqual('Servant#2');
    expect(nodeValues[2].innerText).toEqual('Servant#1');
  });

  it('should not add node to the children of a sibling branch node', () => {
    const internalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const disciple1InternalTreeEl = internalTreeChildren[0];
    const disciple2InternalTreeEl = internalTreeChildren[3];

    expect(disciple1InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#1');
    expect(disciple2InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#2');

    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Disciple#2');

    const capturedNode = new CapturedNode(disciple1InternalTreeEl.componentInstance.element, disciple1InternalTreeEl.componentInstance.tree);
    nodeDraggableService.fireNodeDragged(capturedNode, disciple2InternalTreeEl.componentInstance.element);

    fixture.detectChanges();

    expect(disciple1InternalTreeEl.componentInstance.tree.positionInParent).toEqual(1);
    expect(disciple2InternalTreeEl.componentInstance.tree.positionInParent).toEqual(0);

    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#2');

    expect(lordInternalTreeEl.componentInstance.tree.children.length).toEqual(2);
    expect(disciple2InternalTreeEl.componentInstance.tree.children).toBeNull();

    const lordElement = lordInternalTreeEl.nativeElement;
    const nodeValues = lordElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Lord');
    expect(nodeValues[1].innerText).toEqual('Disciple#2');
    expect(nodeValues[2].innerText).toEqual('Disciple#1');
    expect(nodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(nodeValues[4].innerText).toEqual('SubDisciple#2');
  });

  it('should be impossible to drag parent onto its child', () => {
    const internalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant2InternalTreeEl = internalTreeChildren[1];

    const capturedNode = new CapturedNode(masterComponentInstance.element, masterComponentInstance.tree);
    nodeDraggableService.fireNodeDragged(capturedNode, servant2InternalTreeEl.componentInstance.element);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Servant#2');

    const masterElement = fixture.debugElement.nativeElement;
    const nodeValues = masterElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Master');
    expect(nodeValues[1].innerText).toEqual('Servant#1');
    expect(nodeValues[2].innerText).toEqual('Servant#2');
  });

  it('should be possible to drag node from one subtree to another subtree in the same parent tree', () => {
    const internalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const disciple1InternalTreeEl = internalTreeChildren[0];
    const subDisciple1InternalTreeEl = internalTreeChildren[1];
    const subDisciple2InternalTreeEl = internalTreeChildren[2];
    const disciple2InternalTreeEl = internalTreeChildren[3];

    expect(disciple1InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#1');
    expect(subDisciple1InternalTreeEl.componentInstance.tree.value).toEqual('SubDisciple#1');
    expect(subDisciple2InternalTreeEl.componentInstance.tree.value).toEqual('SubDisciple#2');
    expect(disciple2InternalTreeEl.componentInstance.tree.value).toEqual('Disciple#2');

    const capturedNode = new CapturedNode(subDisciple1InternalTreeEl.componentInstance.element, subDisciple1InternalTreeEl.componentInstance.tree);
    nodeDraggableService.fireNodeDragged(capturedNode, disciple2InternalTreeEl.componentInstance.element);

    fixture.detectChanges();

    expect(lordInternalTreeEl.componentInstance.tree.children.length).toEqual(3);
    expect(lordInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Disciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#1');
    expect(lordInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Disciple#2');

    expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(1);
    expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('SubDisciple#2');

    const lordElement = lordInternalTreeEl.nativeElement;
    const nodeValues = lordElement.querySelectorAll('.node-value');

    expect(nodeValues[0].innerText).toEqual('Lord');
    expect(nodeValues[1].innerText).toEqual('Disciple#1');
    expect(nodeValues[2].innerText).toEqual('SubDisciple#2');
    expect(nodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(nodeValues[4].innerText).toEqual('Disciple#2');
  });

  it('should be possible to drag node from one subtree to another subtree in different parent trees', () => {
    const lordInternalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const disciple1InternalTreeEl = lordInternalTreeChildren[0];
    const subDisciple1InternalTreeEl = lordInternalTreeChildren[1];

    const masterInternalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant1InternalTreeEl = masterInternalTreeChildren[0];

    const capturedNode = new CapturedNode(servant1InternalTreeEl.componentInstance.element, servant1InternalTreeEl.componentInstance.tree);
    nodeDraggableService.fireNodeDragged(capturedNode, subDisciple1InternalTreeEl.componentInstance.element);

    fixture.detectChanges();

    expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(3);
    expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#1');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[2].value).toEqual('SubDisciple#2');

    expect(masterInternalTreeEl.componentInstance.tree.children.length).toEqual(1);
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');

    const lordElement = lordInternalTreeEl.nativeElement;
    const lordNodeValues = lordElement.querySelectorAll('.node-value');

    expect(lordNodeValues[0].innerText).toEqual('Lord');
    expect(lordNodeValues[1].innerText).toEqual('Disciple#1');
    expect(lordNodeValues[2].innerText).toEqual('Servant#1');
    expect(lordNodeValues[3].innerText).toEqual('SubDisciple#1');
    expect(lordNodeValues[4].innerText).toEqual('SubDisciple#2');
    expect(lordNodeValues[5].innerText).toEqual('Disciple#2');

    const masterElement = masterInternalTreeEl.nativeElement;
    const masterNodeValues = masterElement.querySelectorAll('.node-value');

    expect(masterNodeValues[0].innerText).toEqual('Master');
    expect(masterNodeValues[1].innerText).toEqual('Servant#2');
  });

  it('add node to its children', () => {
    const lordInternalTreeChildren = lordInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const disciple1InternalTreeEl = lordInternalTreeChildren[0];

    const masterInternalTreeChildren = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant1InternalTreeEl = masterInternalTreeChildren[0];

    const capturedNode = new CapturedNode(servant1InternalTreeEl.componentInstance.element, servant1InternalTreeEl.componentInstance.tree);
    nodeDraggableService.fireNodeDragged(capturedNode, disciple1InternalTreeEl.componentInstance.element);

    fixture.detectChanges();

    expect(disciple1InternalTreeEl.componentInstance.tree.children.length).toEqual(3);
    expect(disciple1InternalTreeEl.componentInstance.tree.children[0].value).toEqual('SubDisciple#1');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[1].value).toEqual('SubDisciple#2');
    expect(disciple1InternalTreeEl.componentInstance.tree.children[2].value).toEqual('Servant#1');

    expect(masterInternalTreeEl.componentInstance.tree.children.length).toEqual(1);
    expect(masterInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Servant#2');

    const lordElement = lordInternalTreeEl.nativeElement;
    const lordNodeValues = lordElement.querySelectorAll('.node-value');

    expect(lordNodeValues[0].innerText).toEqual('Lord');
    expect(lordNodeValues[1].innerText).toEqual('Disciple#1');
    expect(lordNodeValues[2].innerText).toEqual('SubDisciple#1');
    expect(lordNodeValues[3].innerText).toEqual('SubDisciple#2');
    expect(lordNodeValues[4].innerText).toEqual('Servant#1');
    expect(lordNodeValues[5].innerText).toEqual('Disciple#2');

    const masterElement = masterInternalTreeEl.nativeElement;
    const masterNodeValues = masterElement.querySelectorAll('.node-value');

    expect(masterNodeValues[0].innerText).toEqual('Master');
    expect(masterNodeValues[1].innerText).toEqual('Servant#2');
  });

  it('shouldn\'t show root of the tree', () => {
    expect(faceComponentInstance.tree.isRoot()).toEqual(true, 'Element that has rootless class should be a root of the tree');

    const treeUl = faceInternalTreeEl.query(By.css('.tree'));
    expect(treeUl.classes['rootless']).toEqual(true, 'Tree with hidden root should have "rootless" css class');

    const valueContainer = faceInternalTreeEl.query(By.css('.value-container'));
    expect(valueContainer.classes['rootless']).toEqual(true, 'Element which contains tree value should also have "rootless" css class');
  });

  it('should not propagate root visibility to its children - in other words only root should be modified in the tree and hidden', () => {
    const childEl = faceInternalTreeEl.query(By.directive(TreeInternalComponent));
    expect(childEl.componentInstance.tree.isRoot()).toEqual(false);
    expect(childEl.query(By.css('.tree')).classes['rootless']).toEqual(false, 'Only element with root tree node can have rootless class');
    expect(childEl.query(By.css('.value-container')).classes['rootless']).toEqual(false, 'Only element with root tree node can have rootless class');
  });

  describe('Static Tree', () => {
    it('should not show menu', () => {
      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      faceInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(faceComponentInstance.isRightMenuVisible).toEqual(false);
      expect(faceInternalTreeEl.query(By.css('.node-menu'))).toEqual(null);

      const childEl = faceInternalTreeEl.query(By.directive(TreeInternalComponent));
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(false);
      expect(childEl.query(By.css('.node-menu'))).toEqual(null);
    });

    it('should allow to override static option for it\'s children', () => {
      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      const childEl = faceInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[1];

      childEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(childEl.componentInstance.tree.value).toEqual('Retina');
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(true);
      expect(childEl.query(By.css('.node-menu'))).toBeTruthy();
    });

    it('should not be draggable', () => {
      const internalTreeChildren = faceInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const eyesEl = internalTreeChildren[0];
      const lipsEl = internalTreeChildren[3];

      expect(eyesEl.componentInstance.tree.value).toEqual('Eyes');
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);

      expect(lipsEl.componentInstance.tree.value).toEqual('Lips');
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(1);

      const capturedNode = new CapturedNode(eyesEl.componentInstance.element, eyesEl.componentInstance.tree);
      nodeDraggableService.fireNodeDragged(capturedNode, lipsEl.componentInstance.element);

      fixture.detectChanges();

      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(1);

      expect(faceInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(faceInternalTreeEl.componentInstance.tree.children[1].value).toEqual('Lips');

      const nativeElement = faceInternalTreeEl.nativeElement;
      const nodeValues = nativeElement.querySelectorAll('.node-value');

      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyebrow');
      expect(nodeValues[4].innerText).toEqual('Lips');
    });
  });
 */
});
