import { Input, Component, OnInit, ElementRef, Inject } from '@angular/core';
import { TreeStatus, TreeModel, TreeModelOptions, TreeViewOptions, FoldingType } from './tree.types';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeMenuItemSelectedEvent, NodeMenuItemAction } from './menu/menu.types';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.types';
import { TreeService } from './tree.service';
import * as EventUtils from './utils/event.utils';
import * as TypeUtils from './utils/type.utils';

@Component({
  selector: 'tree-internal',
  template: `
  <ul class="tree" *ngIf="tree" [ngClass]="{rootless: !viewOptions.rootIsVisible}">
    <li>
      <div [ngClass]="{rootless: !viewOptions.rootIsVisible}" (contextmenu)="showMenu($event)" [nodeDraggable]="element" [tree]="tree">
        <div class="folding" (click)="switchFoldingType($event, tree)" [ngClass]="getFoldingTypeCssClass(tree)"></div>
        <div href="#" class="node-value" *ngIf="!isEditInProgress()" [class.node-selected]="isSelected" (click)="onNodeSelected($event)">{{tree.value}}</div>

        <input type="text" class="node-value" *ngIf="isEditInProgress()"
               [nodeEditable]="tree.value"
               (valueChanged)="applyNewValue($event, tree)"/>
      </div>

      <node-menu *ngIf="isMenuVisible" (menuItemSelected)="onMenuItemSelected($event)"></node-menu>

      <template [ngIf]="isNodeExpanded()">
        <tree-internal *ngFor="let child of tree.children; let position = index"
              [parentTree]="tree"
              [indexInParent]="position"
              [tree]="child"></tree-internal>
      </template>
    </li>
  </ul>
  `
})
export class TreeInternalComponent implements OnInit {
  @Input()
  public tree: TreeModel;

  @Input()
  public viewOptions: TreeViewOptions;

  @Input()
  public parentTree: TreeModel;

  @Input()
  public indexInParent: number;

  public isSelected: boolean = false;

  private isMenuVisible: boolean = false;

  public constructor(@Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
                     @Inject(TreeService) private treeService: TreeService,
                     @Inject(ElementRef) public element: ElementRef) {
  }

  public ngOnInit(): void {
    this.tree._indexInParent = this.indexInParent;

    this.tree.options = TreeModelOptions.merge(this.tree, this.parentTree);
    this.viewOptions = this.viewOptions || new TreeViewOptions();

    this.treeService.unSelectEventStreamFor(this.tree).subscribe(() => this.isSelected = false);
    this.nodeMenuService.hideMenuEventStreamFor(this.element).subscribe(() => this.isMenuVisible = false);

    this.treeService.addDragNDropBehaviourTo({
      tree: this.tree,
      parentTree: this.parentTree,
      treeElementRef: this.element
    });
  }

  public onNodeSelected(e: MouseEvent): void {
    if (EventUtils.isLeftButtonClicked(e)) {
      this.isSelected = true;
      this.treeService.selectNode(this.tree);
    }
  }

  // FOLDING -----------------------------------------------------------------------------------------------------------

  private isNodeExpanded(): boolean {
    return this.tree._foldingType === FoldingType.Expanded;
  }

  public switchFoldingType(e: any, tree: TreeModel): void {
    if (tree._foldingType !== FoldingType.Leaf) {
      tree._foldingType = this.getNextFoldingType(tree);
    }
  }

  public getFoldingTypeCssClass(node: TreeModel): string {
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

  // MENU --------------------------------------------------------------------------------------------------------------

  public showMenu(e: MouseEvent): void {
    if (this.tree.options.static) {
      return;
    }

    if (EventUtils.isRightButtonClicked(e)) {
      this.isMenuVisible = !this.isMenuVisible;
      this.nodeMenuService.hideMenuForAllNodesExcept(this.element);
    }
    e.preventDefault();
  }

  public onMenuItemSelected(e: NodeMenuItemSelectedEvent): void {
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

  private onNewSelected(e: NodeMenuItemSelectedEvent): void {
    const newNode = TypeUtils.createTreeNode(e.nodeMenuItemAction === NodeMenuItemAction.NewFolder);

    if (TypeUtils.isLeaf(this.tree)) {
      this.parentTree.children.push(newNode);
    } else {
      this.tree.children.push(newNode);
    }

    this.isMenuVisible = false;
  }

  private onRenameSelected(): void {
    this.tree._status = TreeStatus.EditInProgress;
    this.isMenuVisible = false;
  }

  private onRemoveSelected(): void {
    this.treeService.removeNode(this.tree, this.parentTree);
  }

  // NODE VALUE EDITING ------------------------------------------------------------------------------------------------

  public applyNewValue(e: NodeEditableEvent, node: TreeModel): void {
    if (e.action === NodeEditableEventAction.Cancel) {
      if (TypeUtils.isValueEmpty(e.value)) {
        return this.treeService.removeNode(this.tree, this.parentTree);
      }
    } else {
      const nodeNewValue = this.treeService.toNodeValue({currentValue: node.value, newValue: e.value});
      if (node._status === TreeStatus.New) {
        node.value = nodeNewValue;
        this.treeService.createNode(node, this.parentTree);
      }

      if (node._status === TreeStatus.EditInProgress) {
        this.treeService.renameNode(nodeNewValue, this.tree, this.parentTree);
      }
    }

    node._status = TreeStatus.Modified;
  }

  public isEditInProgress(): boolean {
    return this.tree._status === TreeStatus.EditInProgress || this.tree._status === TreeStatus.New;
  }
}
