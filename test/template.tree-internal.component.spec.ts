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

const tree: TreeModel = {
  value: 'Master',
  icon: 'icon0',
  children: [{ value: 'Servant#1', icon: 'icon1' }, { value: 'Servant#2', icon: 'icon2' }]
};

@Component({
  template: `<div><tree id="master" [tree]="tree"><ng-template let-node><span class="icon">{{node.icon}}</span><span class="value">{{node.value}}</span></ng-template></tree></div>`
})
class TestComponent {
  public tree: TreeModel = tree;
  public constructor(public treeHolder: ElementRef) {}
}

describe('template for tree', () => {
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

    fixture.detectChanges();
  });

  it('should not render default node', () => {
    const foldingEl: DebugElement[] = masterInternalTreeEl.queryAll(By.css('.node-name'));
    expect(foldingEl.length).toEqual(0);
  });

  it('should render the template', () => {
    const icons: DebugElement[] = masterInternalTreeEl.queryAll(By.css('.icon'));
    expect(icons.length).toEqual(3);
    expect(icons[0].nativeElement.innerHTML).toEqual('icon0');
    expect(icons[1].nativeElement.innerHTML).toEqual('icon1');
    expect(icons[2].nativeElement.innerHTML).toEqual('icon2');

    const values: DebugElement[] = masterInternalTreeEl.queryAll(By.css('.value'));
    expect(values.length).toEqual(3);
    expect(values[0].nativeElement.innerHTML).toEqual('Master');
    expect(values[1].nativeElement.innerHTML).toEqual('Servant#1');
    expect(values[2].nativeElement.innerHTML).toEqual('Servant#2');
  });
});
