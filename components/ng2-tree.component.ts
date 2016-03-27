import {Input, Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
    selector: 'ng2-tree',
    template: `
      <ul class="tree">
        <li>
          <span class="folding" (click)="switchFolding($event, tree)" [ngClass]="foldingType(tree)"></span>
          <span class="node-value">{{tree.value}}</span>
          <ng2-tree *ngFor="#child of tree.children" [tree]="child"></ng2-tree>
        </li>
      </ul>
    `,
    directives: [Ng2Tree, CORE_DIRECTIVES]
})
export class Ng2Tree {
    private static COMPONENT_TAG_NAME: string = 'NG2-TREE';
    private static FOLDING_NODE_EXPANDED: string = 'node-expanded';
    private static FOLDING_NODE_COLLAPSED: string = 'node-collapsed';
    private static FOLDING_NODE_LEAF: string = 'node-leaf';

    @Input()
    private tree: any;

    private switchFolding($event: any, tree: any): void {
        this.handleFoldingType($event.target.parentNode, tree);
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
}
