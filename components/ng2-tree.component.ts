import {Input} from "angular2/core";
import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
  selector: 'ng2-tree',
  template: `
      <ul class="tree">
        <li>
          <span class="folding" (click)="switchFolding($event, tree)" [ngClass]="foldingType(tree)"></span><span class="node-value">{{tree.value}}</span>
          <ng2-tree *ngFor="#child of tree.children" [tree]="child"></ng2-tree>
        </li>
      </ul>
  `,
  directives: [Ng2Tree, CORE_DIRECTIVES]
})
export class Ng2Tree {
  @Input()
  private tree:any;

  private switchFolding($event: any, tree: any): void {
    this.handleFoldingType($event.target.parentNode, tree);
  }
  
  private foldingType(node: any): any {
    if (node.foldingType) {
      return node.foldingType;
    }

    if (node.children) {
      node.foldingType = 'node-expanded';
      return 'node-expanded';
    }

    node.foldingType = 'leaf';
    return 'leaf';
  }

  private nextFoldingType(node: any): string {
    if (node.foldingType === 'node-expanded') {
      return 'node-collapsed';
    }

    return 'node-expanded';
  }

  private handleFoldingType(parent: any, node: any) {
    if (node.foldingType === 'leaf') {
      return;
    }
    
    let display = 'block';
    if (node.foldingType === 'node-expanded') {
      display = 'none';
    }

    node.foldingType = this.nextFoldingType(node);
    for (let element of parent.childNodes) {
      if (element.nodeName === 'NG2-TREE') {
        element.style.display = display;
      }
    }
  }
}
