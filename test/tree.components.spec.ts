import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { TreeInternalComponent } from '../src/tree-internal.component';
import { TreeComponent } from '../src/tree.component';
import { TreeModel } from '../src/tree.types';
import { TreeService } from '../src/tree.service';
import { NodeMenuService } from '../src/menu/node-menu.service';
import { NodeMenuComponent } from '../src/menu/node-menu.component';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { NodeDraggableDirective } from '../src/draggable/node-draggable.directive';
import { NodeEditableDirective } from '../src/editable/node-editable.directive';
import { SafeHtmlPipe } from '../src/utils/safe-html.pipe';

let fixture: ComponentFixture<TestComponent>;
let componentInstance: TreeComponent;
let componentEl: DebugElement;

@Component({
  template: `
    <div><tree [tree]="model"></tree></div>
  `
})
class TestComponent {
  public model: TreeModel;
}

describe('TreeComponent (the one that wraps TreeInternalComponent)', () => {
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
    componentEl = fixture.debugElement.query(By.directive(TreeComponent));
    componentInstance = componentEl.componentInstance;

    fixture.detectChanges();
  });

  it('should be initialized', () => {
    expect(fixture).not.toBeNull();
    expect(componentInstance.tree).not.toBeFalsy();
  });

  it('should have default empty tree if none was given via input', () => {
    expect(componentInstance.tree.value).toEqual('');
    expect(componentInstance.tree.isRoot()).toEqual(true);
    expect(componentInstance.treeModel).toBeFalsy();
    expect(componentInstance.tree.children).toBeFalsy();
  });

  it('should use given model if it is not falsy', () => {
    fixture.debugElement.componentInstance.model = {
      value: '42'
    };

    fixture.detectChanges();

    expect(componentInstance.tree.value).toEqual('42');
    expect(componentInstance.treeModel.value).toEqual('42');
    expect(componentInstance.rootComponent.controller.tree.value).toEqual('42');
  });
});
