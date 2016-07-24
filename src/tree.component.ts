import {Input, Component, OnInit, EventEmitter, Output, ElementRef, Inject} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TreeStatus, TreeModel, FoldingType, NodeEvent, RenamableNode, NodeSelectedEvent} from './tree.types';
import {NodeEditableDirective} from './editable/node-editable.directive';
import {NodeMenuComponent} from './menu/node-menu.component';
import {NodeDraggableService} from './draggable/node-draggable.service';
import {NodeMenuService} from './menu/node-menu.service';
import {NodeDraggableDirective} from './draggable/node-draggable.directive';
import {NodeDraggableEventAction, NodeDraggableEvent} from './draggable/draggable.types';
import {NodeMenuEvent, NodeMenuAction, NodeMenuItemSelectedEvent, NodeMenuItemAction} from './menu/menu.types';
import {NodeEditableEvent, NodeEditableEventAction} from './editable/editable.type';
import {TreeService} from './tree.service';
import {isLeftButtonClicked, isRightButtonClicked} from './common/utils/event.utils';
import * as _ from 'lodash';
import {applyNewValueToRenamable, isRenamable, isValueEmpty} from './common/utils/type.utils';

@Component({
  selector: 'tree-internal',
  styleUrls: ['./tree.component.css'],
  templateUrl: './tree.component.html',
  directives: [NodeEditableDirective, TreeInternalComponent, NodeMenuComponent, NodeDraggableDirective, CORE_DIRECTIVES],
})
class TreeInternalComponent implements OnInit {
  @Input()
  private tree: TreeModel;

  @Input()
  private parentTree: TreeModel;

  @Input()
  private indexInParent: number;

  @Output()
  private nodeRemoved: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  private isLeaf: boolean;
  private isSelected: boolean = false;
  private isMenuVisible: boolean = false;

  public constructor(
    @Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
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

  private setUpNodeSelectedEventHandler() {
    this.treeService.nodeSelected$
      .filter((e: NodeSelectedEvent) => this.tree !== e.node)
      .subscribe(_ => this.isSelected = false);
  }

  private setUpMenuEventHandler() {
    this.nodeMenuService.nodeMenuEvents$
      .filter((e: NodeMenuEvent) => this.element.nativeElement !== e.sender)
      .filter((e: NodeMenuEvent) => e.action === NodeMenuAction.Close)
      .subscribe(_ => this.isMenuVisible = false);
  }

  // DRAG-N-DROP -------------------------------------------------------------------------------------------------------

  private setUpDraggableEventHandler() {
    this.nodeDraggableService.draggableNodeEvents$
      .filter((e:NodeDraggableEvent) => e.action === NodeDraggableEventAction.Remove)
      .filter((e:NodeDraggableEvent) => e.captured.element === this.element)
      .subscribe((e:NodeDraggableEvent) => this.onChildRemoved({node: e.captured.tree}, this.parentTree));

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e:NodeDraggableEvent) => e.action !== NodeDraggableEventAction.Remove)
      .filter((e:NodeDraggableEvent) => e.target === this.element)
      .filter((e:NodeDraggableEvent) => !this.hasChild(e.captured.tree))
      .subscribe((e:NodeDraggableEvent) => {
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

  private isEditInProgress() {
    return this.tree._status === TreeStatus.EditInProgress
      || this.tree._status === TreeStatus.New;
  }

  private isFolder() {
    return !this.isLeaf;
  }

  private hasChild(child: TreeModel): boolean {
    return _.includes(this.tree.children, child);
  }

  private isSiblingOf(child: TreeModel) {
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

  private handleFoldingType(parent: TreeModel, node: TreeModel) {
    if (node._foldingType === FoldingType.Leaf) {
      return;
    }

    node._foldingType = this.getNextFoldingType(node);
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private onMenuItemSelected(e: NodeMenuItemSelectedEvent) {
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

  private onRenameSelected() {
    this.tree._status = TreeStatus.EditInProgress;
    this.isMenuVisible = false;
  }

  private onRemoveSelected() {
    this.treeService.nodeRemoved$.next({
      node: this.tree,
      parent: this.parentTree
    });

    this.nodeRemoved.emit({node: this.tree});
  }

  private onNewSelected(e: NodeMenuItemSelectedEvent) {
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

  private onChildRemoved(e: NodeEvent, parent: TreeModel = this.tree) {
    const childIndex = _.findIndex(parent.children, child => child === e.node);
    if (childIndex >= 0) {
      parent.children.splice(childIndex, 1);
    }
  }

  private showMenu(e: MouseEvent): void {
    if (isRightButtonClicked(e)) {
      this.isMenuVisible = !this.isMenuVisible;
      this.nodeMenuService.nodeMenuEvents$.next({
        sender: this.element.nativeElement,
        action: NodeMenuAction.Close
      });
    }
    e.preventDefault();
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

  private onNodeSelected(e: MouseEvent) {
    if (isLeftButtonClicked(e)) {
      this.isSelected = true;
      this.treeService.nodeSelected$.next({node: this.tree});
    }
  }
}

@Component({
  selector: 'tree',
  providers: [NodeMenuService, NodeDraggableService, TreeService],
  template: `<tree-internal [tree]="tree"></tree-internal>`,
  directives: [TreeInternalComponent]
})
export class TreeComponent implements OnInit {
  @Input()
  private tree: TreeModel;

  @Output()
  private nodeCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeRenamed: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  private nodeMoved: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(TreeService) private treeService: TreeService) {
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
  }
}
