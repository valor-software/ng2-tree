import {Input, Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Ng2TreeService} from './ng2-tree.service';
import {EditableNodeDirective} from './editable-node.directive.ts';

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
          <div class="node-menu" *ngIf="isMenuVisible">
            <ul class="node-menu-content">
              <li (click)="rename($event, tree)">Rename node</li>
              <li>Add node</li>
              <li (click)="remove($event, tree)">Remove node</li>
            </ul>          
          </div>
          <ng2-tree *ngFor="#child of tree.children" [tree]="child"></ng2-tree>
        </li>
      </ul>
    `,
  directives: [EditableNodeDirective, Ng2Tree, CORE_DIRECTIVES]
})
export class Ng2Tree implements OnInit {
  private static COMPONENT_TAG_NAME: string = 'NG2-TREE';
  private static FOLDING_NODE_EXPANDED: string = 'node-expanded';
  private static FOLDING_NODE_COLLAPSED: string = 'node-collapsed';
  private static FOLDING_NODE_LEAF: string = 'node-leaf';

  @Input()
  private tree: any;

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

  private rename($event: any, node: any) {
    if ($event.which === 1) {
      this.edit = true;
    }
  }

  private remove($event: any, node: any) {
    if ($event.which === 1) {
      this.treeService.emitRemoveEvent({node});
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
    
    this.previousEvent = $event.type;
    node.value = $event.value;
    this.edit = false;
  }

  ngOnInit(): void {
    this.treeService.menuEventStream()
      .subscribe(menuEvent => {
        if (menuEvent.sender !== this && menuEvent.action === 'close') {
          this.isMenuVisible = false;
        }
      })
      
    this.treeService.removeNodeEventStream()
      .subscribe(removeEvent => {
        if (!this.tree || !this.tree.children) return;
        for (let i = 0; i < this.tree.children.length; i++) {
          const child = this.tree.children[i];
          if (child === removeEvent.node) {
            delete this.tree.children[i];
            
            break;
          }
        }
      })
  }
}
