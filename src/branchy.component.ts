import {Input, Component, OnInit, EventEmitter, Output, ElementRef, Inject} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import * as _ from 'lodash';
import {
  TreeStatus,
  NodeMenuItemSelectedEvent,
  NodeMenuItemAction,
  NodeEditableEvent,
  NodeDraggableEvent,
  NodeMenuAction,
  NodeMenuEvent,
  TreeModel,
  FoldingType,
  TreeEvent, NodeDraggableEventAction
} from './types';
import {NodeEditableDirective} from './node-editable.directive';
import {NodeMenuComponent} from './node-menu.component';
import {NodeDraggableService} from './node-draggable.service';
import {NodeMenuService} from './node-menu.service';
import {NodeDraggableDirective} from './node-draggable.directive';

@Component({
  selector: 'tree',
  styles: [require('./branchy.component.styl')],
  template: require('./branchy.component.html'),
  directives: [
    NodeEditableDirective,
    TreeComponent,
    NodeMenuComponent,
    NodeDraggableDirective,
    CORE_DIRECTIVES
  ],
})
class TreeComponent implements OnInit {
  @Input('model')
  private tree: TreeModel;

  @Input()
  private parentTree: TreeModel;

  @Input()
  private indexInParent: number = 0;

  @Output()
  private nodeRemoved: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();

  private isLeaf: boolean;
  private isMenuVisible: boolean = false;
  private previousEvent: NodeEditableEvent;

  public constructor(
    @Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
    @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
    @Inject(ElementRef) private element: ElementRef) {
  }

  public ngOnInit(): void {
    this.isLeaf = !Array.isArray(this.tree.children);

    this.tree.indexInParent = this.indexInParent;
    //TODO: Feature envy detected!
    this.tree.status = this.tree.status === TreeStatus.New ? TreeStatus.EditInProgress : this.tree.status;

    this.setUpMenuEventHandler();
    this.setUpDraggableEventHandler();
  }

  // DRAG-N-DROP -------------------------------------------------------------------------------------------------------

  private setUpMenuEventHandler() {
    this.nodeMenuService.nodeMenuEvents$
      .filter((event: NodeMenuEvent) => !this.element.nativeElement.contains(event.sender))
      .filter((event: NodeMenuEvent) => event.action === NodeMenuAction.Close)
      .subscribe(_ => this.isMenuVisible = false);
  }

  private setUpDraggableEventHandler() {
    this.nodeDraggableService.draggableNodeEvents$
      .filter(event => event.action === NodeDraggableEventAction.Remove)
      .filter(event => event.captured.element === this.element)
      .subscribe(event => this.onChildRemoved({node: event.captured.tree}, this.parentTree));

    this.nodeDraggableService.draggableNodeEvents$
      .filter(event => event.action !== NodeDraggableEventAction.Remove)
      .filter(event => event.target === this.element)
      .filter(event => !this.hasChild(event.captured.tree))
      .subscribe(event => {
        if (this.isSiblingOf(event.captured.tree)) {
          return this.swapWithSibling(event.captured.tree);
        }

        if (this.isFolder()) {
          return this.moveNodeToThisTreeAndRemoveFromPreviousOne(event);
        } else {
          return this.moveNodeToParentTreeAndRemoveFromPreviousOne(event);
        }
      });
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(event: NodeDraggableEvent): void {
    this.tree.children.push(event.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(event, {action: NodeDraggableEventAction.Remove}));
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(event: NodeDraggableEvent): void {
    this.parentTree.children.splice(this.indexInParent, 0, event.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(event, {action: NodeDraggableEventAction.Remove}));
  }

  private isEditInProgress() {
    return this.tree.status === TreeStatus.EditInProgress;
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
  }

  // FOLDING -----------------------------------------------------------------------------------------------------------

  private isNodeExpanded(): boolean {
    return this.tree.foldingType === FoldingType.Expanded;
  }

  private switchFolding($event: any, tree: TreeModel): void {
    this.handleFoldingType($event.target.parentNode.parentNode, tree);
  }

  private foldingType(node: TreeModel): FoldingTypeCssClass {
    if (!node.foldingType) {
      if (node.children) {
        node.foldingType = FoldingType.Expanded;
      } else {
        node.foldingType = FoldingType.Leaf;
      }
    }

    return this.toCssClass(node.foldingType);
  }

  private nextFoldingType(node: TreeModel): FoldingType {
    if (node.foldingType === FoldingType.Expanded) {
      return FoldingType.Collapsed;
    }

    return FoldingType.Expanded;
  }

  private handleFoldingType(parent: TreeModel, node: TreeModel) {
    if (node.foldingType === FoldingType.Leaf) {
      return;
    }

    node.foldingType = this.nextFoldingType(node);
  }

  private toCssClass(foldingType: FoldingType): FoldingTypeCssClass {
    switch (foldingType) {
      case FoldingType.Expanded:
        return 'node-expanded';
      case FoldingType.Collapsed:
        return 'node-collapsed';
      default:
        return 'node-leaf';
    }
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private onMenuItemSelected($event: NodeMenuItemSelectedEvent) {
    switch ($event.nodeMenuItemAction) {
      case NodeMenuItemAction.NewTag:
        this.onNewSelected($event);
        break;
      case NodeMenuItemAction.NewFolder:
        this.onNewSelected($event);
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
    this.tree.status = TreeStatus.EditInProgress;
    this.isMenuVisible = false;
  }

  private onRemoveSelected() {
    this.nodeRemoved.emit({node: this.tree});
  }

  private onNewSelected(event: NodeMenuItemSelectedEvent) {
    if (!this.tree.children || !this.tree.children.push) {
      this.tree.children = [];
    }
    const newNode: TreeModel = {value: '', status: TreeStatus.New};

    if (event.nodeMenuItemAction === NodeMenuItemAction.NewFolder) {
      newNode.children = [];
    }

    this.isLeaf ? this.parentTree.children.push(newNode) : this.tree.children.push(newNode);
    this.isMenuVisible = false;
  }

  private onChildRemoved(event: TreeEvent, parent: TreeModel = this.tree) {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      if (child === event.node) {
        parent.children.splice(i, 1);
        break;
      }
    }
  }

  private showMenu($event: MouseEvent): void {
    if ($event.which === 3) {
      this.isMenuVisible = !this.isMenuVisible;
      this.nodeMenuService.nodeMenuEvents$.next({sender: this.element.nativeElement, action: NodeMenuAction.Close})
    }
    $event.preventDefault();
  }

  private applyNewValue($event: NodeEditableEvent, node: TreeModel): void {
    if (!this.previousEvent) {
      this.previousEvent = $event;
    }

    if (this.previousEvent.type === 'keyup' && $event.type === 'blur') {
      this.previousEvent = $event;
      return;
    }

    if (!$event.value) {
      return this.nodeRemoved.emit({node: this.tree});
    }

    this.previousEvent = $event;
    node.value = $event.value;
    node.status = TreeStatus.Modified;
  }
}

type FoldingTypeCssClass = 'node-expanded' | 'node-collapsed' | 'node-leaf';

@Component({
  selector: 'branchy',
  providers: [NodeMenuService, NodeDraggableService],
  template: `<tree [model]="tree"></tree>`,
  directives: [TreeComponent]
})
export class BranchyComponent {
  @Input('model')
  private tree: TreeModel
}
