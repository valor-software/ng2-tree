import {Input, Component, OnInit, EventEmitter, Output} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Ng2TreeService} from './ng2-tree.service';
import {EditableNodeDirective} from './editable-node.directive';
import {NodeMenuComponent} from "./node-menu.component";
import {TreeStatus} from "./types";

@Component({
  selector: 'ng2-tree',
  template: `
      <ul *ngIf="tree" class="tree">
        <li>
          <div (contextmenu)="showMenu($event)">
            <span class="folding" (click)="switchFolding($event, tree)" [ngClass]="foldingType(tree)"></span>
            <span class="node-value" *ngIf="!edit">{{tree.value}}</span>
            <input type="text" class="node-value" editable [nodeValue]="tree.value" (valueChanged)="applyNewValue($event, tree)" *ngIf="edit"/>
          </div>

          <node-menu *ngIf="isMenuVisible" 
            (removeSelected)="onRemoveSelected()" 
            (renameSelected)="onRenameSelected()"
            (newSelected)="onNewSelected()"></node-menu>

          <ng2-tree *ngFor="#child of tree.children" [tree]="child" (nodeRemoved)="onChildRemoved($event)"></ng2-tree>
        </li>
      </ul>
    `,
  directives: [EditableNodeDirective, Ng2Tree, NodeMenuComponent, CORE_DIRECTIVES]
})
export class Ng2Tree implements OnInit {
  private static COMPONENT_TAG_NAME: string = 'NG2-TREE';
  private static FOLDING_NODE_EXPANDED: string = 'node-expanded';
  private static FOLDING_NODE_COLLAPSED: string = 'node-collapsed';
  private static FOLDING_NODE_LEAF: string = 'node-leaf';

  @Input()
  private tree: any;

  @Output()
  private nodeRemoved: EventEmitter<any> = new EventEmitter();

  private treeService: Ng2TreeService;
  private isMenuVisible: boolean = false;
  private edit: boolean = false;
  private previousEvent: any;

  constructor(treeService: Ng2TreeService) {
    this.treeService = treeService;
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

    let display = 'block';
    if (node.foldingType === Ng2Tree.FOLDING_NODE_EXPANDED) {
      display = 'none';
    }

    node.foldingType = this.nextFoldingType(node);
    for (let element of parent.childNodes) {
      if (element.nodeName === Ng2Tree.COMPONENT_TAG_NAME) {
        element.style.display = display;
      }
    }
  }

  private onRenameSelected() {
      this.edit = true;
  }

  private onRemoveSelected() {
    this.nodeRemoved.emit({node: this.tree});
  }

  private onNewSelected() {
    if (!this.tree.children || !this.tree.children.push) {
      this.tree.children = [];
    }
    this.tree.children.push({value: '', status: TreeStatus.New});
  }

  private onChildRemoved(event: any) {
    for (let i = 0; i < this.tree.children.length; i++) {
      const child = this.tree.children[i];
      if (child === event.node) {
        this.tree.children.splice(i, 1);
        break;
      }
    }
  }

  private showMenu($event: MouseEvent): void {
    if ($event.which === 3) {
      this.isMenuVisible = !this.isMenuVisible;
      this.treeService.emitMenuEvent({sender: this, action: 'close'})
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
    this.edit = false;
  }

  ngOnInit(): void {
    if (!this.tree) return;

    if (this.tree.status === TreeStatus.New) {
      this.edit = true;
    }

    this.treeService.menuEventStream()
      .subscribe(menuEvent => {
        if (menuEvent.sender !== this && menuEvent.action === 'close') {
          this.isMenuVisible = false;
        }
      });
  }
}
