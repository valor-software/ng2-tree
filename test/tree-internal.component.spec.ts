import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ElementRef } from '@angular/core';
import { TreeInternalComponent } from '../src/tree-internal.component';
import { TreeComponent } from '../src/tree.component';
import { TreeModel, Tree } from '../src/tree.types';
import { TreeService } from '../src/tree.service';
import { NodeMenuService } from '../src/menu/node-menu.service';
import { NodeMenuComponent } from '../src/menu/node-menu.component';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { NodeDraggableDirective } from '../src/draggable/node-draggable.directive';
import { NodeEditableDirective } from '../src/editable/node-editable.directive';

let fixture;
let componentInstance;
let nodeMenuService;
let nodeDraggableService;
let treeService;
let internalTreeEl;

const tree: TreeModel = {
  value: '42',
  children: [
    {value: '12'}
  ]
};

describe('TreeInternalComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TreeInternalComponent, TreeComponent, NodeEditableDirective, NodeMenuComponent, NodeDraggableDirective],
      providers: [NodeMenuService, NodeDraggableService, TreeService]
    });

    fixture = TestBed.createComponent(TestComponent);
    internalTreeEl = fixture.debugElement.query(By.directive(TreeInternalComponent));
    componentInstance = internalTreeEl.componentInstance;

    nodeMenuService = TestBed.get(NodeMenuService);
    nodeDraggableService = TestBed.get(NodeDraggableService);
    treeService = TestBed.get(TreeService);
  });

  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
    expect(nodeMenuService).not.toBeNull();
    expect(nodeDraggableService).not.toBeNull();
    expect(treeService).not.toBeNull();
  });

  it('should have properly set tree property', () => {
    fixture.detectChanges();
    expect(componentInstance.tree).toBeDefined();
    expect(componentInstance.tree.value).toEqual('42');
  });
});

@Component({
  template: '<div><tree [tree]="tree"></tree></div>'
})
class TestComponent {
  public tree: Tree = new Tree(tree);

  public constructor(public treeHolder: ElementRef) {
  }
}
