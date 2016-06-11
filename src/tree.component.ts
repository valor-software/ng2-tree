import {Input, Component, OnInit, EventEmitter, Output, ElementRef, Inject} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {TreeService} from './tree.service';
import {NodeEditableDirective} from './node-editable.directive';
import {NodeMenuComponent} from './node-menu.component';
import {
  TreeStatus,
  NodeMenuItemSelectedEvent,
  NodeMenuItemAction,
  NodeEditableEvent,
  NodeDraggableEvent,
  NodeMenuAction,
  NodeMenuEvent,
  TreeModel,
  FoldingType
} from './types';
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
  private model: any;

  @Input()
  private parent: any;

  @Input()
  private positionRelativelyToParent: number = 0;

  @Output()
  private nodeRemoved: EventEmitter<any> = new EventEmitter();

  private isFolder: boolean;
  private isMenuVisible: boolean = false;
  private edit: boolean = false;
  private previousEvent: any;

  public constructor(@Inject(TreeService) private treeService: TreeService,
                     @Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
                     @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
                     @Inject(ElementRef) private element: ElementRef) {
  }

  private isNodeExpanded(): boolean {
    return this.model.foldingType === FoldingType.Expanded;
  }

  private switchFolding($event: any, tree: TreeModel): void {
    this.handleFoldingType($event.target.parentNode.parentNode, tree);
  }

  private foldingType(node: TreeModel): any {
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

  private handleFoldingType(parent: any, node: TreeModel) {
    if (node.foldingType === FoldingType.Leaf) {
      return;
    }

    node.foldingType = this.nextFoldingType(node);
  }

  private onRenameSelected() {
    this.edit = true;
    this.isMenuVisible = false;
  }

  private onRemoveSelected() {
    this.nodeRemoved.emit({node: this.model});
  }

  private onNewSelected(event: any) {
    if (!this.model.children || !this.model.children.push) {
      this.model.children = [];
    }
    const newNode: any = {value: '', status: TreeStatus.New};

    if (event.isFolder) {
      newNode.children = [];
    }

    this.isFolder ? this.model.children.push(newNode) : this.parent.children.push(newNode);
    this.isMenuVisible = false;
  }

  private onMenuItemSelected($event: NodeMenuItemSelectedEvent) {
    console.log($event);
    switch ($event.nodeMenuItemAction) {
      case NodeMenuItemAction.NewTag:
        this.onNewSelected({});
        break;
      case NodeMenuItemAction.NewFolder:
        this.onNewSelected({isFolder: true});
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

  private onChildRemoved(event: any, parent: any = this.model) {
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

  private applyNewValue($event: NodeEditableEvent, node: any): void {
    if (!this.previousEvent) {
      this.previousEvent = $event.type;
    }

    if (this.previousEvent === 'keyup' && $event.type === 'blur') {
      this.previousEvent = $event.type;
      return;
    }

    if (!$event.value) {
      return this.nodeRemoved.emit({node: this.model});
    }

    this.previousEvent = $event.type;
    node.value = $event.value;
    node.status = TreeStatus.Modified;
    this.edit = false;
  }

  ngOnInit(): void {
    this.model.position = this.positionRelativelyToParent;
    if (!this.model) return;

    if (this.model.status === TreeStatus.New) {
      this.edit = true;
    }

    this.isFolder = this.model.children && this.model.children.push;

    this.nodeMenuService.nodeMenuEvents$
      .subscribe((menuEvent: NodeMenuEvent) => {
        if (!this.element.nativeElement.contains(menuEvent.sender) && menuEvent.action === NodeMenuAction.Close) {
          this.isMenuVisible = false;
        }
      });

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

          if (this.isFolder) {

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

            this.parent.children.splice(this.positionRelativelyToParent, 0, event.captured.tree);
            event.action = 'remove';
            this.nodeDraggableService.draggableNodeEvents$.next(event);
            console.log('foreign')
          }
        }
      });
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
