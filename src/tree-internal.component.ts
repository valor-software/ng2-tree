
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';

import * as TreeTypes from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeMenuItemAction, NodeMenuItemSelectedEvent } from './menu/menu.events';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.events';
import { NodeEvent, NodeRemovedEvent, NodeCheckedEvent, NodeIndeterminateEvent } from './tree.events'
import { TreeService } from './tree.service';
import * as EventUtils from './utils/event.utils';
import { NodeDraggableEvent } from './draggable/draggable.events';
import { Subscription } from 'rxjs/Subscription';
import { get, has } from './utils/fn.utils';

@Component({
  selector: 'tree-internal',
  template: `
  <ul class="tree" *ngIf="tree" [ngClass]="{rootless: isRootHidden()}">
    <li>
      <div class="value-container"
        [ngClass]="{rootless: isRootHidden()}"
        [class.selected]="isSelected"
        (contextmenu)="showRightMenu($event)"
        [nodeDraggable]="element"
        [tree]="tree">

        <div class="folding" (click)="onSwitchFoldingType()" [ngClass]="tree.foldingCssClass"></div>

        <div class="node-checkbox" *ngIf="settings.showCheckboxes">	
        <input checkbox  type="checkbox" [disabled]="isReadOnly" [checked]="isChecked" (change)="NodeCheckSatusChanged()" #checkbox />			
         </div>

        <div class="node-value"
          *ngIf="!shouldShowInputForTreeValue()"
          [class.node-selected]="isSelected"
          (click)="onNodeSelected($event)">
            <div *ngIf="tree.nodeTemplate" class="node-template" [innerHTML]="tree.nodeTemplate | safeHtml"></div>
            <span *ngIf="!template" class="node-name" [innerHTML]="tree.value | safeHtml"></span>
            <span class="loading-children" *ngIf="tree.childrenAreBeingLoaded()"></span>
            <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ $implicit: tree.node }"></ng-template>
        </div>

               <input type="text" class="node-value"
           *ngIf="shouldShowInputForTreeValue()"
           [nodeEditable]="tree.value"
           (valueChanged)="applyNewValue($event)"/>

        <div class="node-left-menu" *ngIf="tree.hasLeftMenu()" (click)="showLeftMenu($event)" [innerHTML]="tree.leftMenuTemplate">
        </div>
        <node-menu *ngIf="tree.hasLeftMenu() && isLeftMenuVisible && !hasCustomMenu()"
          (menuItemSelected)="onMenuItemSelected($event)">
        </node-menu>
      </div>

      <node-menu *ngIf="isRightMenuVisible && !hasCustomMenu()"
           (menuItemSelected)="onMenuItemSelected($event)">
      </node-menu>

      <node-menu *ngIf="hasCustomMenu() && (isRightMenuVisible || isLeftMenuVisible)"
           [menuItems]="tree.menuItems"
           (menuItemSelected)="onMenuItemSelected($event)">
      </node-menu>
      <ng-template [ngIf]="tree.isNodeExpanded()">
        <tree-internal *ngFor="let child of tree.childrenAsync | async" [tree]="child" [template]="template" [settings]="settings"></tree-internal>
      </ng-template>
    </li>
  </ul>
  `
})
export class TreeInternalComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public tree: Tree;

  @Input()
  public settings: TreeTypes.Ng2TreeSettings;

  @Input()
  public template: TemplateRef<any>;

  public isSelected = false;
  public isRightMenuVisible = false;
  public isLeftMenuVisible = false;
  public isChecked = false;
  public isReadOnly = false;
  public controller: TreeController;


  @ViewChild('checkbox')
  _checkboxElement: ElementRef;

  private subscriptions: Subscription[] = [];


  public constructor(private nodeMenuService: NodeMenuService,
    public treeService: TreeService,
    public element: ElementRef) {
  }

  public ngOnInit(): void {
    this.controller = new TreeController(this);
    if (get(this.tree, 'node.id', '')) {
      this.treeService.setController(this.tree.node.id, this.controller);
    }


    this.settings = this.settings || { rootIsVisible: true, showCheckboxes: false, enableCheckboxes: true };

    this.isChecked = this.tree.isChecked;

    this.isReadOnly = has(this.settings, 'enableCheckboxes') ? !this.settings.enableCheckboxes : false;

    this.subscriptions.push(this.nodeMenuService.hideMenuStream(this.element)
      .subscribe(() => {
        this.isRightMenuVisible = false;
        this.isLeftMenuVisible = false;
      }));

    this.subscriptions.push(this.treeService.unselectStream(this.tree)
      .subscribe(() => this.isSelected = false));

    this.subscriptions.push(this.treeService.draggedStream(this.tree, this.element)
      .subscribe((e: NodeDraggableEvent) => {
        if (this.tree.hasSibling(e.captured.tree)) {
          this.swapWithSibling(e.captured.tree, this.tree);
        } else if (this.tree.isBranch()) {
          this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, this.tree);
        } else {
          this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, this.tree);
        }
      }));

    this.subscriptions.push(this.treeService.nodeChecked$
      .filter((e: NodeCheckedEvent) => this.eventContainsId(e) && this.tree.children
        && this.tree.children.some((child: Tree) => child.id === e.node.id))
      .subscribe((e: NodeCheckedEvent) => {
        this.updateIndeterminateState();
      }));


    this.subscriptions.push(this.treeService.nodeUnchecked$
      .filter((e: NodeCheckedEvent) => this.eventContainsId(e) && this.tree.children
        && this.tree.children.some((child: Tree) => child.id === e.node.id))
      .subscribe((e: NodeCheckedEvent) => {
        this.updateIndeterminateState();
      }));


    this.subscriptions.push(this.treeService.nodeIndeterminate$
      .filter((e: NodeIndeterminateEvent) => this.eventContainsId(e) &&
        this.tree.children && this.tree.children.some((child: Tree) => child.id === e.node.id))
      .subscribe((e: NodeIndeterminateEvent) => {
      }));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.controller = new TreeController(this);
  }

  public ngOnDestroy(): void {
    if (get(this.tree, 'node.id', '')) {
      this.treeService.deleteController(this.tree.node.id);
    }

    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }

  private swapWithSibling(sibling: Tree, tree: Tree): void {
    tree.swapWithSibling(sibling);
    this.treeService.fireNodeMoved(sibling, sibling.parent);
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent, tree: Tree): void {
    this.treeService.fireNodeRemoved(e.captured.tree);
    const addedChild = tree.addChild(e.captured.tree);
    this.treeService.fireNodeMoved(addedChild, e.captured.tree.parent);
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent, tree: Tree): void {
    this.treeService.fireNodeRemoved(e.captured.tree);
    const addedSibling = tree.addSibling(e.captured.tree, tree.positionInParent);
    this.treeService.fireNodeMoved(addedSibling, e.captured.tree.parent);
  }

  public onNodeSelected(e: { button: number }): void {
    if (EventUtils.isLeftButtonClicked(e as MouseEvent)) {
      this.isSelected = true;
      this.treeService.fireNodeSelected(this.tree);
    }
  }

  public showRightMenu(e: MouseEvent): void {
    if (!this.tree.hasRightMenu()) {
      return;
    }

    if (EventUtils.isRightButtonClicked(e)) {
      this.isRightMenuVisible = !this.isRightMenuVisible;
      this.nodeMenuService.hideMenuForAllNodesExcept(this.element);
    }
    e.preventDefault();
  }

  public showLeftMenu(e: MouseEvent): void {
    if (!this.tree.hasLeftMenu()) {
      return;
    }

    if (EventUtils.isLeftButtonClicked(e)) {
      this.isLeftMenuVisible = !this.isLeftMenuVisible;
      this.nodeMenuService.hideMenuForAllNodesExcept(this.element);
      if (this.isLeftMenuVisible) {
        e.preventDefault();
      }
    }
  }

  public onMenuItemSelected(e: NodeMenuItemSelectedEvent): void {
    switch (e.nodeMenuItemAction) {
      case NodeMenuItemAction.NewTag:
        this.onNewSelected(e);
        break;
      case NodeMenuItemAction.NewFolder:
        this.onNewSelected(e);
        break;
      case NodeMenuItemAction.Rename:
        this.onRenameSelected();
        break;
      case NodeMenuItemAction.Remove:
        this.onRemoveSelected();
        break;
      case NodeMenuItemAction.Custom:
        this.treeService.fireMenuItemSelected(this.tree, e.nodeMenuItemSelected);
        break;
      default:
        throw new Error(`Chosen menu item doesn't exist`);
    }
  }

  private onNewSelected(e: NodeMenuItemSelectedEvent): void {
    this.tree.createNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);
    this.isRightMenuVisible = false;
    this.isLeftMenuVisible = false;
  }

  private onRenameSelected(): void {
    this.tree.markAsBeingRenamed();
    this.isRightMenuVisible = false;
    this.isLeftMenuVisible = false;
  }

  private onRemoveSelected(): void {
    this.treeService.deleteController(get(this.tree, 'node.id', ''));
    this.treeService.fireNodeRemoved(this.tree);
  }

  public onSwitchFoldingType(): void {
    this.tree.switchFoldingType();
    this.treeService.fireNodeSwitchFoldingType(this.tree);
  }

  public applyNewValue(e: NodeEditableEvent): void {
    if ((e.action === NodeEditableEventAction.Cancel || this.tree.isNew()) && Tree.isValueEmpty(e.value)) {
      return this.treeService.fireNodeRemoved(this.tree);
    }

    if (this.tree.isNew()) {
      this.tree.value = e.value;
      this.treeService.fireNodeCreated(this.tree);
    }

    if (this.tree.isBeingRenamed()) {
      const oldValue = this.tree.value;
      this.tree.value = e.value;
      this.treeService.fireNodeRenamed(oldValue, this.tree);
    }

    this.tree.markAsModified();
  }

  public shouldShowInputForTreeValue(): boolean {
    return this.tree.isNew() || this.tree.isBeingRenamed();
  }

  public isRootHidden(): boolean {
    return this.tree.isRoot() && !this.settings.rootIsVisible;
  }

  public hasCustomMenu(): boolean {
    return this.tree.hasCustomMenu();
  }

  public NodeCheckSatusChanged() {
    if (!this.isChecked) {
      this.onNodeChecked();
    }
    else {
      this.onNodeUnchecked();
    }

  }

  public onNodeChecked(): void {
    this._checkboxElement.nativeElement.indeterminate = false;
    this.treeService.fireNodeChecked(this.tree);
    this.executeOnChildController(controller => controller.check());
    this.isChecked = true;
    this.tree.isChecked = true;
  }

  public onNodeUnchecked(): void {
    this._checkboxElement.nativeElement.indeterminate = false;

    this.treeService.fireNodeUnchecked(this.tree);

    this.executeOnChildController(controller => controller.uncheck());
    this.isChecked = false;
    this.tree.isChecked = false;
  }

  private executeOnChildController(executor: (controller: TreeController) => void) {
    if (this.tree.children) {
      this.tree.children.forEach((child: Tree) => {
        let controller = this.treeService.getController(child.id);
        if (controller != null) {
          executor(controller);
        }
      });
    }
  }

  public updateIndeterminateState(): void {

    setTimeout(() => { // Calling setTimeout so the value of isChecked will be updated and after that I'll check the children status.
      this.updateIndeterminateStateInternal();
    }, 1)
  };


  private updateIndeterminateStateInternal(): void {
    const checkedChildren = this.tree.children.filter(child => child.isChecked).length;

    if (checkedChildren === 0) {
      this._checkboxElement.nativeElement.indeterminate = false;
      this.isChecked = false;
      this.tree.isChecked = false;
      this.treeService.fireNodeUnchecked(this.tree)
    }
    else if (checkedChildren === this.tree.children.length) {
      this._checkboxElement.nativeElement.indeterminate = false;
      this.isChecked = true;
      this.tree.isChecked = true;
      this.treeService.fireNodeChecked(this.tree)
    }
    else {
      this.setNodeInderminated();
    }
  }

  private setNodeInderminated(): void {
    this._checkboxElement.nativeElement.indeterminate = true;
    this.treeService.fireNodeIndeterminate(this.tree);
  }

  private eventContainsId(event: NodeEvent): boolean {
    if (!event.node.id) {
      console.log('Checking feature requires a well known id for every node, lease prvide a unique id.')
      return false;
    }
    return true;
  }
}
