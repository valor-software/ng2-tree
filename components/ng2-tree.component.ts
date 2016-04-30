import {Input, Component, OnInit, EventEmitter, Output, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Ng2TreeService} from './ng2-tree.service';
import {EditableNodeDirective} from './editable-node.directive';
import {NodeMenuComponent} from './node-menu.component';
import {TreeStatus} from './types';
import Draggable from './draggable.directive';

@Component({
  selector: 'ng2-tree',
  styles: [require('./ng2-tree.component.styl')],
  template: require('./ng2-tree.component.html'),
  directives: [EditableNodeDirective, Ng2Tree, NodeMenuComponent, Draggable, CORE_DIRECTIVES],
})
export class Ng2Tree implements OnInit {
  private static FOLDING_NODE_EXPANDED: string = 'node-expanded';
  private static FOLDING_NODE_COLLAPSED: string = 'node-collapsed';
  private static FOLDING_NODE_LEAF: string = 'node-leaf';

  @Input()
  private tree: any;

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

  public constructor(private treeService: Ng2TreeService, private element: ElementRef) {
  }

  private isNodeExpanded(): boolean {
    return this.tree.foldingType === Ng2Tree.FOLDING_NODE_EXPANDED;
  }

  private switchFolding($event: any, tree: any): void {
    this.handleFoldingType($event.target.parentNode.parentNode, tree);
  }

  private foldingType(node: any): any {
    if (node.foldingType) {
      return node.foldingType;
    }

    if (node.children) {
      node.foldingType = Ng2Tree.FOLDING_NODE_EXPANDED;
    } else {
      node.foldingType = Ng2Tree.FOLDING_NODE_LEAF;
    }

    return node.foldingType;
  }

  private nextFoldingType(node: any): string {
    if (node.foldingType === Ng2Tree.FOLDING_NODE_EXPANDED) {
      return Ng2Tree.FOLDING_NODE_COLLAPSED;
    }

    return Ng2Tree.FOLDING_NODE_EXPANDED;
  }

  private handleFoldingType(parent: any, node: any) {
    if (node.foldingType === Ng2Tree.FOLDING_NODE_LEAF) {
      return;
    }

    node.foldingType = this.nextFoldingType(node);
  }

  private onRenameSelected() {
      this.edit = true;
      this.isMenuVisible = false;
  }

  private onRemoveSelected() {
    this.nodeRemoved.emit({node: this.tree});
  }

  private onNewSelected(event: any) {
    if (!this.tree.children || !this.tree.children.push) {
      this.tree.children = [];
    }
    const newNode: any = {value: '', status: TreeStatus.New};

    if (event.isFolder) {
      newNode.children = [];
    }

    this.isFolder ? this.tree.children.push(newNode) : this.parent.children.push(newNode);
    this.isMenuVisible = false;
  }

  private onChildRemoved(event: any, parent: any = this.tree) {
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
      this.treeService.emitMenuEvent({sender: this.element.nativeElement, action: 'close'})
    }
    $event.preventDefault();
  }

  private applyNewValue($event: any, node: any): void {
    if (!this.previousEvent) {
      this.previousEvent = $event.type;
    }

    if (this.previousEvent === 'keyup' && $event.type === 'blur') {
      this.previousEvent = $event.type;
      return;
    }

    if (!$event.value) {
      return this.nodeRemoved.emit({node: this.tree});
    }

    this.previousEvent = $event.type;
    node.value = $event.value;
    node.status = TreeStatus.Modified;
    this.edit = false;
  }

  ngOnInit(): void {
    this.tree.position = this.positionRelativelyToParent;
    if (!this.tree) return;

    if (this.tree.status === TreeStatus.New) {
      this.edit = true;
    }

    this.isFolder = this.tree.children && this.tree.children.push;

    this.treeService.menuEventStream()
      .subscribe(menuEvent => {
        if (!this.element.nativeElement.contains(menuEvent.sender) && menuEvent.action === 'close') {
          this.isMenuVisible = false;
        }
      });

    this.treeService.dragNDropEventStream()
      // .filter((event: any) => event.target === this.element.nativeElement)
      .subscribe((event: any) => {
        if (event.source === this.element && event.action === 'remove') {

           this.onChildRemoved({node: event.value}, this.parent);
          return;
        }


        if(event.target === this.element && event.action !== 'remove') {
          if (this.tree.children && this.tree.children.indexOf(event.value) >= 0) {
            console.log('moved element to existing parent');
            return;
          }

          if (this.isFolder) {

            this.tree.children.push(event.value);
            event.action = 'remove';
            this.treeService.emitDragNDropEvent(event);
            console.log('folder')
          } else if (this.parent.children.indexOf(event.value) >= 0) {

            const ev = this.parent.children.indexOf(event.value);
            const tv = this.parent.children.indexOf(this.tree);

            this.parent.children[ev] = this.tree;
            this.parent.children[tv] = event.value;
            console.log('sibling')
          } else {

            this.parent.children.splice(this.positionRelativelyToParent, 0, event.value);
            event.action = 'remove';
            this.treeService.emitDragNDropEvent(event);
            console.log('foreign')
          }
        }
    });
  }
}
