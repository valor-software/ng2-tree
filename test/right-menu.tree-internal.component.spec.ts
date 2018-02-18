import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ElementRef, DebugElement } from '@angular/core';
import { TreeInternalComponent } from '../src/tree-internal.component';
import { TreeComponent } from '../src/tree.component';
import { TreeModel, Ng2TreeSettings } from '../src/tree.types';
import { TreeService } from '../src/tree.service';
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
let masterInternalTreeEl;
let masterComponentInstance;
let rightMenuInternalTreeEl;
let rightMenuComponentInstance;
let staticInternalTreeEl;
let staticComponentInstance;
let nodeMenuService;
let nodeDraggableService;
let treeService;

const tree: TreeModel = {
  value: 'Master',
  children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
};

const tree2: TreeModel = {
  value: 'Right Menu',
  children: [
    { value: 'Right Menu Not Set Child' },
    {
      value: 'Inactive',
      settings: {
        rightMenu: false
      },
      children: [{ value: 'Right Menu Inactive Child' }]
    },
    {
      value: 'Active',
      settings: {
        rightMenu: true
      },
      children: [{ value: 'Right Menu Active Child' }]
    },
    {
      value: 'Inactive With Active Children',
      settings: {
        rightMenu: false
      },
      children: [
        {
          value: 'Reactivate Right Menu',
          settings: {
            rightMenu: true
          },
          children: [{ value: 'Reactivated Right Menu Children' }]
        }
      ]
    }
  ]
};

const tree3: TreeModel = {
  value: 'Face',
  settings: {
    static: true,
    rightMenu: true
  },
  children: [
    {
      value: 'Eyes',
      settings: {
        rightMenu: true
      }
    },
    {
      value: 'Retina',
      settings: {
        static: false
      },
      children: [
        {
          value: 'Eyelash',
          settings: {
            rightMenu: true
          }
        },
        {
          value: 'Eyebow',
          settings: {
            rightMenu: false
          },
          children: []
        }
      ]
    },
    { value: 'Lips' }
  ]
};

@Component({
  template: `
    <div><tree id="master" [tree]="tree"></tree></div>
    <div><tree id="right-menu" [tree]="tree2"></tree></div>
    <div><tree id="static" [tree]="tree3"></tree></div>
  `
})
class TestComponent {
  public tree: TreeModel = tree;
  public tree2: TreeModel = tree2;
  public tree3: TreeModel = tree3;

  public constructor(public treeHolder: ElementRef) {}
}

describe('RightMenu-TreeInternalComponent', () => {
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
      providers: [NodeMenuService, NodeDraggableService, TreeService]
    });

    fixture = TestBed.createComponent(TestComponent);

    masterInternalTreeEl = fixture.debugElement.query(By.css('#master')).query(By.directive(TreeInternalComponent));
    masterComponentInstance = masterInternalTreeEl.componentInstance;

    rightMenuInternalTreeEl = fixture.debugElement
      .query(By.css('#right-menu'))
      .query(By.directive(TreeInternalComponent));
    rightMenuComponentInstance = rightMenuInternalTreeEl.componentInstance;

    staticInternalTreeEl = fixture.debugElement.query(By.css('#static')).query(By.directive(TreeInternalComponent));
    staticComponentInstance = staticInternalTreeEl.componentInstance;

    nodeMenuService = TestBed.get(NodeMenuService);
    nodeDraggableService = TestBed.get(NodeDraggableService);
    treeService = TestBed.get(TreeService);

    fixture.detectChanges();
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
    expect(nodeDraggableService).not.toBeNull();
    expect(treeService).not.toBeNull();
  });

  it('should hide right menu when appropriate event has occurred', () => {
    spyOn(nodeMenuService, 'hideMenuForAllNodesExcept');

    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterComponentInstance.isRightMenuVisible).toEqual(true);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(nodeMenuService.hideMenuForAllNodesExcept).toHaveBeenCalledTimes(1);
    expect(nodeMenuService.hideMenuForAllNodesExcept).toHaveBeenCalledWith(masterComponentInstance.nodeElementRef);
  });

  it('should show right menu on node by default', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    rightMenuInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(rightMenuComponentInstance.isRightMenuVisible).toEqual(true);
    const menus = rightMenuInternalTreeEl.queryAll(By.css('.node-menu'));

    expect(menus.length).toEqual(1);
    expect(menus[0].queryAll(By.css('.node-menu-item')).length).toEqual(4);
  });

  it('should show right menu on node`s child, which has no special configuration', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    const defaultChild = rightMenuInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[0];

    defaultChild.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(defaultChild.componentInstance.isRightMenuVisible).toEqual(true);
    const menus = defaultChild.queryAll(By.css('.node-menu'));

    expect(menus.length).toEqual(1);
    expect(menus[0].queryAll(By.css('.node-menu-item')).length).toEqual(4);
  });

  it('shouldn`t show right menu on node and it`s children, which has setting rightMenu - false', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    const inactiveChild = rightMenuInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[1];

    inactiveChild.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(inactiveChild.componentInstance.isRightMenuVisible).toEqual(false);
    expect(inactiveChild.query(By.css('.node-menu'))).toEqual(null);

    const childEl = inactiveChild.query(By.directive(TreeInternalComponent));
    expect(childEl.componentInstance.isRightMenuVisible).toEqual(false);
    expect(childEl.query(By.css('.node-menu'))).toEqual(null);
  });

  it('should remove node by click on appropriate menu item', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    const servantEls = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant1El = servantEls[0];

    servant1El.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(servant1El.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = servant1El.query(By.css('.node-menu'));

    const menuItemRemove: DebugElement = menu.query(By.css('.remove')).parent;

    const eventRemove = { button: EventUtils.MouseButtons.Left };
    menuItemRemove.triggerEventHandler('click', eventRemove);

    fixture.detectChanges();

    const remainedSevantEls = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(remainedSevantEls.length).toEqual(1);
    expect(remainedSevantEls[0].componentInstance.tree.value).toEqual('Servant#2');
  });

  it('should hide menu on click outside of menu', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    const servantEls = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    const servant1El = servantEls[0];

    servant1El.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(servant1El.componentInstance.isRightMenuVisible).toEqual(true);
    expect(servant1El.query(By.css('.node-menu'))).toBeDefined();

    nodeMenuService.fireMenuEvent(null, NodeMenuAction.Close);

    fixture.detectChanges();

    expect(servant1El.componentInstance.isRightMenuVisible).toEqual(false);
    expect(servant1El.query(By.css('.node-menu'))).toBeNull();
  });

  it('should rename node on enter', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuItemRename: DebugElement = menu.query(By.css('.rename')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'bla' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.value).toEqual('bla');
  });

  it('should rename node on blur', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuItemRename: DebugElement = menu.query(By.css('.rename')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('blur', { target: { value: 'bla' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.value).toEqual('bla');
  });

  it('should cancel renaming node on escape pressed', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuItemRename: DebugElement = menu.query(By.css('.rename')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.nativeElement.value = '121212';
    inputRename.triggerEventHandler('keyup.esc', { target: { value: 'bla' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.value).toEqual('Master');
  });

  it('should not rename node on empty input', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuItemRename: DebugElement = menu.query(By.css('.rename')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuItemRename.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('blur', { target: { value: '' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.value).toEqual('Master');
  });

  it('should create a leaf child when NewTag operation activated on a branch node', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuNewTag: DebugElement = menu.query(By.css('.new-tag')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'bla' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.children.length).toEqual(3);
    expect(masterComponentInstance.tree.children[2].value).toEqual('bla');
    expect(
      masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[2].nativeElement.querySelector('.node-value')
        .innerText
    ).toEqual('bla');
  });

  it('should create a sibling leaf when NewTag operation was activated on a node that is leaf', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    const servant1El = masterInternalTreeEl.query(By.directive(TreeInternalComponent));

    servant1El.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(servant1El.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = servant1El.query(By.css('.node-menu'));

    const menuNewTag: DebugElement = menu.query(By.css('.new-tag')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeTruthy();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'bla' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.children.length).toEqual(3);
    expect(masterComponentInstance.tree.children[2].value).toEqual('bla');
    expect(
      masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[2].nativeElement.querySelector('.node-value')
        .innerText
    ).toEqual('bla');
  });

  it('should not create a node with empty value', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuNewTag: DebugElement = menu.query(By.css('.new-tag')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: '\r\n\t ' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.children.length).toEqual(2);
    expect(masterComponentInstance.tree.children[0].value).toEqual('Servant#1');
    expect(masterComponentInstance.tree.children[1].value).toEqual('Servant#2');

    const servantEls = masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
    expect(servantEls.length).toEqual(2);
    expect(servantEls[0].nativeElement.querySelector('.node-value').innerText).toEqual('Servant#1');
    expect(servantEls[1].nativeElement.querySelector('.node-value').innerText).toEqual('Servant#2');
  });

  it('should create a branch node when NewFolder operation activated', () => {
    const event = jasmine.createSpyObj('e', ['preventDefault']);
    event.button = EventUtils.MouseButtons.Right;

    masterInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

    fixture.detectChanges();

    expect(masterInternalTreeEl.componentInstance.isRightMenuVisible).toEqual(true);
    const menu = masterInternalTreeEl.query(By.css('.node-menu'));

    const menuNewTag: DebugElement = menu.query(By.css('.new-folder')).parent;

    const eventRename = { button: EventUtils.MouseButtons.Left };
    menuNewTag.triggerEventHandler('click', eventRename);

    fixture.detectChanges();

    const inputRename = masterInternalTreeEl.query(By.css('input.node-value'));
    expect(inputRename).toBeDefined();
    inputRename.triggerEventHandler('keyup.enter', { target: { value: 'Branch' } });

    fixture.detectChanges();

    expect(masterComponentInstance.tree.children.length).toEqual(3);
    expect(masterComponentInstance.tree.children[2].value).toEqual('Branch');
    expect(masterComponentInstance.tree.children[2].isBranch()).toEqual(true);
    expect(masterComponentInstance.tree.children[2].children).toBeDefined();
    expect(masterComponentInstance.tree.children[2].children.length).toEqual(0);
    expect(
      masterInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[2].nativeElement.querySelector('.node-value')
        .innerText
    ).toEqual('Branch');
  });

  describe('Static Tree', () => {
    it('should not show right menu', () => {
      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      staticInternalTreeEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(staticComponentInstance.isRightMenuVisible).toEqual(false);
      expect(staticInternalTreeEl.query(By.css('.node-menu'))).toEqual(null);

      const childEl = staticInternalTreeEl.query(By.directive(TreeInternalComponent));
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(false);
      expect(childEl.query(By.css('.node-menu'))).toEqual(null);
    });

    it('should not show right menu when settings rightMenu equal to false', () => {
      const internalTreeChildren = staticInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const eyebowEl = internalTreeChildren[3];

      expect(eyebowEl.componentInstance.tree.value).toEqual('Eyebow');
      expect(eyebowEl.componentInstance.tree.positionInParent).toEqual(1);

      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      eyebowEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(eyebowEl.componentInstance.isRightMenuVisible).toEqual(false);
      expect(eyebowEl.query(By.css('.node-menu'))).toEqual(null);
    });

    it("should allow to override static option for it's children", () => {
      const event = jasmine.createSpyObj('e', ['preventDefault']);
      event.button = EventUtils.MouseButtons.Right;

      const childEl = staticInternalTreeEl.queryAll(By.directive(TreeInternalComponent))[1];

      childEl.query(By.css('.value-container')).triggerEventHandler('contextmenu', event);

      fixture.detectChanges();

      expect(childEl.componentInstance.tree.value).toEqual('Retina');
      expect(childEl.componentInstance.isRightMenuVisible).toEqual(true);
      expect(childEl.query(By.css('.node-menu'))).toBeTruthy();
    });

    it('should not be draggable', () => {
      const internalTreeChildren = staticInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const eyesEl = internalTreeChildren[0];
      const lipsEl = internalTreeChildren[4];

      expect(eyesEl.componentInstance.tree.value).toEqual('Eyes');
      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);

      expect(lipsEl.componentInstance.tree.value).toEqual('Lips');
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(2);

      expect(staticInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(staticInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Lips');

      const capturedNode = new CapturedNode(eyesEl.componentInstance.nodeElementRef, eyesEl.componentInstance.tree);
      nodeDraggableService.fireNodeDragged(capturedNode, lipsEl.componentInstance.nodeElementRef);

      fixture.detectChanges();

      expect(eyesEl.componentInstance.tree.positionInParent).toEqual(0);
      expect(lipsEl.componentInstance.tree.positionInParent).toEqual(2);

      expect(staticInternalTreeEl.componentInstance.tree.children[0].value).toEqual('Eyes');
      expect(staticInternalTreeEl.componentInstance.tree.children[2].value).toEqual('Lips');

      const nativeElement = staticInternalTreeEl.nativeElement;
      const nodeValues = nativeElement.querySelectorAll('.node-value');

      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyelash');
      expect(nodeValues[4].innerText).toEqual('Eyebow');
      expect(nodeValues[5].innerText).toEqual('Lips');
    });

    it('should allow to drag and drop not static elements in a static parent', () => {
      const internalTreeChildren = staticInternalTreeEl.queryAll(By.directive(TreeInternalComponent));
      const eyelashEl = internalTreeChildren[2];
      const eyebowEl = internalTreeChildren[3];

      expect(eyelashEl.componentInstance.tree.value).toEqual('Eyelash');
      expect(eyelashEl.componentInstance.tree.positionInParent).toEqual(0);

      expect(eyebowEl.componentInstance.tree.value).toEqual('Eyebow');
      expect(eyebowEl.componentInstance.tree.positionInParent).toEqual(1);

      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[0].value).toEqual('Eyelash');
      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[1].value).toEqual('Eyebow');

      const capturedNode = new CapturedNode(
        eyelashEl.componentInstance.nodeElementRef,
        eyelashEl.componentInstance.tree
      );
      nodeDraggableService.fireNodeDragged(capturedNode, eyebowEl.componentInstance.nodeElementRef);

      fixture.detectChanges();

      expect(eyelashEl.componentInstance.tree.positionInParent).toEqual(1);
      expect(eyebowEl.componentInstance.tree.positionInParent).toEqual(0);

      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[0].value).toEqual('Eyebow');
      expect(staticInternalTreeEl.componentInstance.tree.children[1].children[1].value).toEqual('Eyelash');

      const nativeElement = staticInternalTreeEl.nativeElement;
      const nodeValues = nativeElement.querySelectorAll('.node-value');

      expect(nodeValues[0].innerText).toEqual('Face');
      expect(nodeValues[1].innerText).toEqual('Eyes');
      expect(nodeValues[2].innerText).toEqual('Retina');
      expect(nodeValues[3].innerText).toEqual('Eyebow');
      expect(nodeValues[4].innerText).toEqual('Eyelash');
      expect(nodeValues[5].innerText).toEqual('Lips');
    });
  });
});
