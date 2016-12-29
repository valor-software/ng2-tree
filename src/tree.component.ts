import { Input, Component, OnInit, EventEmitter, Output, ElementRef, Inject } from '@angular/core';
import { TreeStatus, TreeModel, TreeOptions, FoldingType, NodeEvent, RenamableNode, NodeSelectedEvent } from './tree.types';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeDraggableEventAction, NodeDraggableEvent } from './draggable/draggable.types';
import { NodeMenuEvent, NodeMenuAction, NodeMenuItemSelectedEvent, NodeMenuItemAction } from './menu/menu.types';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.type';
import { TreeService } from './tree.service';
import { isLeftButtonClicked, isRightButtonClicked } from './common/utils/event.utils';
import * as _ from 'lodash';
import { applyNewValueToRenamable, isRenamable, isValueEmpty } from './common/utils/type.utils';
import { styles } from './tree.styles';

@Component({
  selector: 'tree-internal',
  styles: styles,
  template: `
  <ul class="tree" *ngIf="tree">
    <li>
      <div (contextmenu)="showMenu($event)" [nodeDraggable]="element" [tree]="tree">
        <div class="folding" (click)="switchFoldingType($event, tree)" [ngClass]="getFoldingTypeCssClass(tree)"></div>
        <div href="#" class="node-value" *ngIf="!isEditInProgress()" [class.node-selected]="isSelected" (click)="onNodeSelected($event)">{{tree.value}}</div>

        <input type="text" class="node-value" *ngIf="isEditInProgress()"
               [nodeEditable]="tree.value"
               (valueChanged)="applyNewValue($event, tree)"/>
      </div>

      <node-menu *ngIf="isMenuVisible" (menuItemSelected)="onMenuItemSelected($event)"></node-menu>

      <template [ngIf]="isNodeExpanded()">
        <tree-internal [options]="options" *ngFor="let child of tree.children; let position = index"
              [parentTree]="tree"
              [indexInParent]="position"
              [tree]="child"
              (nodeRemoved)="onChildRemoved($event)"></tree-internal>
      </template>
    </li>
  </ul>
  `
})
export class TreeInternalComponent implements OnInit {
  @Input()
  public tree: TreeModel;

  @Input()
  public parentTree: TreeModel;

  @Input()
  public indexInParent: number;

  @Input()
  public options: TreeOptions;

  @Output()
  public nodeRemoved: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  private isLeaf: boolean;
  private isSelected: boolean = false;
  private isMenuVisible: boolean = false;

  public constructor(@Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
                     @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
                     @Inject(TreeService) private treeService: TreeService,
                     @Inject(ElementRef) private element: ElementRef) {
  }

  public ngOnInit(): void {
    this.indexInParent = 0;

    this.isLeaf = !Array.isArray(this.tree.children);
    this.tree._indexInParent = this.indexInParent;

    this.setUpNodeSelectedEventHandler();
    this.setUpMenuEventHandler();
    this.setUpDraggableEventHandler();
  }

  private setUpNodeSelectedEventHandler(): void {
    this.treeService.nodeSelected$
      .filter((e: NodeSelectedEvent) => this.tree !== e.node)
      .subscribe(() => this.isSelected = false);
  }

  private setUpMenuEventHandler(): void {
    this.nodeMenuService.nodeMenuEvents$
      .filter((e: NodeMenuEvent) => this.element.nativeElement !== e.sender)
      .filter((e: NodeMenuEvent) => e.action === NodeMenuAction.Close)
      .subscribe(() => this.isMenuVisible = false);
  }

  // DRAG-N-DROP -------------------------------------------------------------------------------------------------------

  private setUpDraggableEventHandler(): void {
    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action === NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.captured.element === this.element)
      .subscribe((e: NodeDraggableEvent) => this.onChildRemoved({node: e.captured.tree}, this.parentTree));

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action !== NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.target === this.element)
      .filter((e: NodeDraggableEvent) => !this.hasChild(e.captured.tree))
      .subscribe((e: NodeDraggableEvent) => {
        if (this.isSiblingOf(e.captured.tree)) {
          return this.swapWithSibling(e.captured.tree);
        }

        if (this.isFolder()) {
          return this.moveNodeToThisTreeAndRemoveFromPreviousOne(e);
        } else {
          return this.moveNodeToParentTreeAndRemoveFromPreviousOne(e);
        }
      });
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent): void {
    this.tree.children.push(e.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));

    this.treeService.nodeMoved$.next({
      node: e.captured.tree,
      parent: this.tree
    });
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent): void {
    this.parentTree.children.splice(this.indexInParent, 0, e.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));

    this.treeService.nodeMoved$.next({
      node: e.captured.tree,
      parent: this.parentTree
    });
  }

  private isEditInProgress(): boolean {
    return this.tree._status === TreeStatus.EditInProgress
      || this.tree._status === TreeStatus.New;
  }

  private isFolder(): boolean {
    return !this.isLeaf;
  }

  private hasChild(child: TreeModel): boolean {
    return _.includes(this.tree.children, child);
  }

  private isSiblingOf(child: TreeModel): boolean {
    return this.parentTree && _.includes(this.parentTree.children, child);
  }

  private swapWithSibling(sibling: TreeModel): void {
    const siblingIndex = this.parentTree.children.indexOf(sibling);
    const thisTreeIndex = this.parentTree.children.indexOf(this.tree);

    this.parentTree.children[siblingIndex] = this.tree;
    this.parentTree.children[thisTreeIndex] = sibling;

    this.tree._indexInParent = siblingIndex;
    sibling._indexInParent = thisTreeIndex;

    this.treeService.nodeMoved$.next({
      node: this.tree,
      parent: this.parentTree
    });
  }

  // FOLDING -----------------------------------------------------------------------------------------------------------

  private isNodeExpanded(): boolean {
    return this.tree._foldingType === FoldingType.Expanded;
  }

  private switchFoldingType(e: any, tree: TreeModel): void {
    this.handleFoldingType(e.target.parentNode.parentNode, tree);
  }

  private getFoldingTypeCssClass(node: TreeModel): string {
    if (!node._foldingType) {
      if (node.children) {
        node._foldingType = FoldingType.Expanded;
      } else {
        node._foldingType = FoldingType.Leaf;
      }
    }

    return node._foldingType.cssClass;
  }

  private getNextFoldingType(node: TreeModel): FoldingType {
    if (node._foldingType === FoldingType.Expanded) {
      return FoldingType.Collapsed;
    }

    return FoldingType.Expanded;
  }

  private handleFoldingType(parent: TreeModel, node: TreeModel): void {
    if (node._foldingType === FoldingType.Leaf) {
      return;
    }

    node._foldingType = this.getNextFoldingType(node);
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private onMenuItemSelected(e: NodeMenuItemSelectedEvent): void {
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
      default:
        throw new Error(`Chosen menu item doesn't exist`);
    }
  }

  private onRenameSelected(): void {
    this.tree._status = TreeStatus.EditInProgress;
    this.isMenuVisible = false;
  }

  private onRemoveSelected(): void {
    this.treeService.nodeRemoved$.next({
      node: this.tree,
      parent: this.parentTree
    });

    this.nodeRemoved.emit({node: this.tree});
  }

  private onNewSelected(e: NodeMenuItemSelectedEvent): void {
    if (!this.tree.children || !this.tree.children.push) {
      this.tree.children = [];
    }
    const newNode: TreeModel = {value: '', _status: TreeStatus.New};

    if (e.nodeMenuItemAction === NodeMenuItemAction.NewFolder) {
      newNode.children = [];
    }

    this.isLeaf ? this.parentTree.children.push(newNode) : this.tree.children.push(newNode);
    this.isMenuVisible = false;
  }

  private onChildRemoved(e: NodeEvent, parent: TreeModel = this.tree): void {
    const childIndex = _.findIndex(parent.children, (child: any) => child === e.node);
    if (childIndex >= 0) {
      parent.children.splice(childIndex, 1);
    }
  }

  private showMenu(e: MouseEvent): void {
    if (isRightButtonClicked(e) && (this.options === undefined || this.options.activateRightMenu)) {
      this.isMenuVisible = !this.isMenuVisible;
      this.nodeMenuService.nodeMenuEvents$.next({
        sender: this.element.nativeElement,
        action: NodeMenuAction.Close
      });
      e.preventDefault();
    }
  }

  private applyNewValue(e: NodeEditableEvent, node: TreeModel): void {
    if (e.action === NodeEditableEventAction.Cancel) {
      if (isValueEmpty(e.value)) {
        return this.nodeRemoved.emit({node: this.tree});
      }

      node._status = TreeStatus.Modified;
      return;
    }

    if (isValueEmpty(e.value)) {
      return;
    }

    const nodeOldValue = node.value;

    if (isRenamable(node.value)) {
      node.value = applyNewValueToRenamable(node.value as RenamableNode, e.value);
    } else {
      node.value = e.value;
    }

    if (node._status === TreeStatus.New) {
      this.treeService.nodeCreated$.next({node, parent: this.parentTree});
    }

    if (node._status === TreeStatus.EditInProgress) {
      this.treeService.nodeRenamed$.next({
        node,
        parent: this.parentTree,
        oldValue: nodeOldValue,
        newValue: node.value
      });
    }

    node._status = TreeStatus.Modified;
  }

  private onNodeSelected(e: MouseEvent): void {
    if (isLeftButtonClicked(e)) {
      this.isSelected = true;
      this.treeService.nodeSelected$.next({node: this.tree});
    }
  }
}

@Component({
  selector: 'tree',
  template: `<tree-internal [tree]="tree" [options]="options"></tree-internal>`,
  providers: [TreeService]
})
export class TreeComponent implements OnInit {
  @Input()
  public tree: TreeModel;

  @Input()
  public treeOptions: TreeOptions;

  @Output()
  public nodeCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeRenamed: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeMoved: EventEmitter<any> = new EventEmitter();

  private options: TreeOptions = {
    activateRightMenu: true
  };

  public constructor(@Inject(TreeService) private treeService: TreeService) {
  }

  public ngOnInit(): void {
    this.treeService.nodeRemoved$.subscribe((e: NodeEvent) => {
      this.nodeRemoved.emit(e);
    });

    this.treeService.nodeRenamed$.subscribe((e: NodeEvent) => {
      this.nodeRenamed.emit(e);
    });

    this.treeService.nodeCreated$.subscribe((e: NodeEvent) => {
      this.nodeCreated.emit(e);
    });

    this.treeService.nodeSelected$.subscribe((e: NodeEvent) => {
      this.nodeSelected.emit(e);
    });

    this.treeService.nodeMoved$.subscribe((e: NodeEvent) => {
      this.nodeMoved.emit(e);
    });

    this.setUpOptions();
  }

  private setUpOptions(): void {
    if (this.treeOptions !== undefined) {
      if (this.treeOptions.activateRightMenu !== undefined) {
        this.options.activateRightMenu = this.treeOptions.activateRightMenu;
      }
    }
  }
}
