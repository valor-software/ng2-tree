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
  settings: {
    cssClasses: {
      expanded: 'fa fa-caret-down',
      collapsed: 'fa fa-caret-right',
      leaf: 'fa'
    },
    templates: {
      node: '<i class="folder"></i>',
      leaf: '<i class="file"></i>'
    }
  },
  children: [
    { value: 'Servant#1' },
    {
      value: 'Servant#2',
      settings: {
        templates: {
          leaf: '<i class="bla"></i>'
        }
      }
    }
  ]
};

@Component({
  template: `<div><tree id="master" [tree]="tree"></tree></div>`
})
class TestComponent {
  public tree: TreeModel = tree;
  public constructor(public treeHolder: ElementRef) {}
}

describe('settings on tree model', () => {
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

  describe('cssClasses setting in tree', () => {
    it('adds appropriate css classes for a expanded node', () => {
      const foldingEl: DebugElement = masterInternalTreeEl.query(By.css('.folding'));
      expect(foldingEl.classes).toEqual({ folding: true, fa: true, 'fa-caret-down': true });
    });

    it('adds appropriate css classes for a collapsed node', () => {
      const foldingEl: DebugElement = masterInternalTreeEl.query(By.css('.folding'));

      foldingEl.nativeElement.click();
      fixture.detectChanges();

      expect(foldingEl.classes).toEqual({ folding: true, fa: true, 'fa-caret-down': false, 'fa-caret-right': true });
    });

    it('adds appropriate css classes for a leaf', () => {
      const foldingEl: DebugElement = masterInternalTreeEl.queryAll(By.css('.folding'))[1];
      expect(foldingEl.classes).toEqual({ folding: true, fa: true });
    });
  });

  describe('templates setting in tree', () => {
    it(`puts node templates content to the left of the node's value`, () => {
      const [
        masterNodeTemplate,
        servant1NodeTemplate,
        servant2NodeTemplate
      ]: DebugElement[] = masterInternalTreeEl.queryAll(By.css('.node-template'));

      expect(masterNodeTemplate.nativeElement.innerHTML).toEqual(tree.settings.templates.node);
      expect(servant1NodeTemplate.nativeElement.innerHTML).toEqual(tree.settings.templates.leaf);
      expect(servant2NodeTemplate.nativeElement.innerHTML).toEqual(tree.children[1].settings.templates.leaf);
    });
  });
});
