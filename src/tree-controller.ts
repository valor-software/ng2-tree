import { TreeService } from './tree.service';
import { Tree } from './tree';
import { TreeModel } from './tree.types';
import { NodeMenuItemAction } from './menu/menu.events';
import { TreeInternalComponent } from './tree-internal.component';
import { MouseButtons } from './utils/event.utils';

export class TreeController {
  private tree: Tree;
  private treeService: TreeService;

  constructor(private component: TreeInternalComponent) {
    this.tree = this.component.tree;
    this.treeService = this.component.treeService;
  }

  public select(): void {
    if (!this.isSelected()) {
      this.component.onNodeSelected({ button: MouseButtons.Left });
    }
  }

  public isSelected(): boolean {
    return this.component.isSelected;
  }

  public expand(): void {
    if (this.isCollapsed()) {
      this.component.onSwitchFoldingType();
    }
  }

  public isExpanded(): boolean {
    return this.tree.isNodeExpanded();
  }

  public collapse(): void {
    if (this.isExpanded()) {
      this.component.onSwitchFoldingType();
    }
  }

  public isCollapsed(): boolean {
    return this.tree.isNodeCollapsed();
  }

  public toTreeModel(): TreeModel {
    return this.tree.toTreeModel();
  }

  public rename(newValue: string): void {
    this.tree.markAsBeingRenamed();
    this.component.applyNewValue({ type: 'keyup', value: newValue });
  }

  public remove(): void {
    this.component.onMenuItemSelected({ nodeMenuItemAction: NodeMenuItemAction.Remove });
  }

  public addChild(newNode: TreeModel): void {
    if (this.tree.hasDeferredChildren() && !this.tree.childrenWereLoaded()) {
      return;
    }

    const newTree = this.tree.createNode(Array.isArray(newNode.children), newNode);
    this.treeService.fireNodeCreated(newTree);
  }

  public changeNodeId(id: string | number) {
    if (!id) {
      throw Error('You should supply an id!');
    }

    if (this.treeService.hasController(id)) {
      throw Error(`Controller already exists for the given id: ${id}`);
    }

    this.treeService.deleteController(this.tree.id);
    this.tree.id = id;
    this.treeService.setController(this.tree.id, this);
  }

  public reloadChildren(): void {
    this.tree.reloadChildren();
  }

  public setChildren(children: TreeModel[]): void {
    if (!this.tree.isLeaf()) {
      this.tree.setChildren(children);
    }
  }

  public startRenaming(): void {
    this.tree.markAsBeingRenamed();

  }
}
