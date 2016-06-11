import {Input, Component, OnInit, EventEmitter, Output, ElementRef, Inject} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
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
  TreeEvent
} from './types';
import {NodeEditableDirective} from './node-editable.directive';
import {NodeMenuComponent} from './node-menu.component';
import Draggable from './node-draggable.directive';
import {NodeDraggableService} from './node-draggable.service';
import {NodeMenuService} from './node-menu.service';

type FoldingTypeCssClass = 'node-expanded' | 'node-collapsed' | 'node-leaf';

@Component({
  selector: 'tree',
  styles: [require('./tree.component.styl')],
  template: require('./tree.component.html'),
  directives: [NodeEditableDirective, TreeComponent, NodeMenuComponent, Draggable, CORE_DIRECTIVES],
})
export class TreeComponent implements OnInit {
  @Input()
  private model: TreeModel;

  @Input()
  private parent: TreeModel;

  @Input()
  private indexInParent: number = 0;

  @Output()
  private nodeRemoved: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();

  private isLeaf: boolean;
  private isMenuVisible: boolean = false;
  private previousEvent: NodeEditableEvent;

  public constructor(@Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
                     @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
                     @Inject(ElementRef) private element: ElementRef) {
  }

  private isNodeExpanded(): boolean {
    return this.model.foldingType === FoldingType.Expanded;
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

  private onRenameSelected() {
    this.model.status = TreeStatus.EditInProgress;
    this.isMenuVisible = false;
  }

  private onRemoveSelected() {
    this.nodeRemoved.emit({node: this.model});
  }

  private onNewSelected(event: NodeMenuItemSelectedEvent) {
    if (!this.model.children || !this.model.children.push) {
      this.model.children = [];
    }
    const newNode: TreeModel = {value: '', status: TreeStatus.New};

    if (event.nodeMenuItemAction === NodeMenuItemAction.NewFolder) {
      newNode.children = [];
    }

    this.isLeaf ? this.parent.children.push(newNode) : this.model.children.push(newNode);
    this.isMenuVisible = false;
  }

  private onMenuItemSelected($event: NodeMenuItemSelectedEvent) {
    console.log($event);
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

  private onChildRemoved(event: TreeEvent, parent: TreeModel = this.model) {
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
      return this.nodeRemoved.emit({node: this.model});
    }

    this.previousEvent = $event;
    node.value = $event.value;
    node.status = TreeStatus.Modified;
  }

  ngOnInit(): void {
    this.setUpMenuEventHandler();

    this.model.indexInParent = this.indexInParent;

    if (this.model.status === TreeStatus.New) {
      this.model.status = TreeStatus.EditInProgress;
    }

    this.isLeaf = !Array.isArray(this.model.children);

    this.nodeDraggableService.draggableNodeEvents$
      .subscribe((event: NodeDraggableEvent) => {
        if (event.captured.element === this.element && event.action === 'remove') {

          this.onChildRemoved({node: event.captured.tree}, this.parent);
          return;
        }


        if (event.target === this.element && event.action !== 'remove') {
          if (this.model.children && this.model.children.indexOf(event.captured.tree) >= 0) {
            console.log('moved element to existing parent');
            return;
          }

          if (!this.isLeaf) {

            this.model.children.push(event.captured.tree);
            event.action = 'remove';
            this.nodeDraggableService.draggableNodeEvents$.next(event);
            console.log('folder')
          } else if (this.parent.children.indexOf(event.captured.tree) >= 0) {

            const ev = this.parent.children.indexOf(event.captured.tree);
            const tv = this.parent.children.indexOf(this.model);

            this.parent.children[ev] = this.model;
            this.parent.children[tv] = event.captured.tree;
            console.log('sibling')
          } else {

            this.parent.children.splice(this.indexInParent, 0, event.captured.tree);
            event.action = 'remove';
            this.nodeDraggableService.draggableNodeEvents$.next(event);
            console.log('foreign')
          }
        }
      });
  }

  private setUpMenuEventHandler() {
    this.nodeMenuService.nodeMenuEvents$
      .filter((event: NodeMenuEvent) => !this.element.nativeElement.contains(event.sender))
      .filter((event: NodeMenuEvent) => event.action === NodeMenuAction.Close)
      .subscribe(_ => this.isMenuVisible = false);
  }

  private isEditInProgress() {
    return this.model.status === TreeStatus.EditInProgress;
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
}
