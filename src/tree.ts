import * as _ from 'lodash';
import { TreeModel, RenamableNode, FoldingType, TreeStatus, TreeModelSettings } from './tree.types';

export class Tree {
  private _children: Tree[];

  public constructor(public node: TreeModel, public parent: Tree = null, isFolder: boolean = false) {
    this._children = isFolder ? [] : null;
  }

  /**
   * Get children of the current tree.
   * @returns {Tree[]} The children of the current tree.
   */
  public get children(): Tree[] {
    return this._children;
  }

  /**
   * Create a new node in the current tree.
   * @param {boolean} isFolder - A flag that indicates whether a new node should be a folder. Leaf will be created by default
   * @returns {Tree} A newly created child node.
   */
  public createNode(isFolder: boolean): Tree {
    const tree = new Tree({ value: '' }, null, isFolder);
    tree.markAsNew();

    if (this.isLeaf()) {
      return this.addSibling(tree);
    } else {
      return this.addChild(tree);
    }
  };

  /**
   * Get the value of the current node
   * @returns {(string|RenamableNode)} The value of the node.
   */
  public get value(): any {
    return this.node.value;
  }

  /**
   * Set the value of the current node
   * @param {(string|RenamableNode)} value - The new value of the node.
   */
  public set value(value: any) {
    if (typeof value !== 'string' && !Tree.isRenamable(value)) {
      return;
    }

    if (Tree.isRenamable(this.value)) {
      const newValue = typeof value === 'string' ? value : _.toString(value);
      this.node.value = Tree.applyNewValueToRenamable(this.value as RenamableNode, newValue);
    } else {
      this.node.value = Tree.isValueEmpty(value as string) ? this.node.value : _.toString(value);
    }
  }

  /**
   * Adds a sibling node for the current node. This won't work if the current node is a root.
   * @param {Tree} sibling - A node that should become a sibling.
   * @param [number] position - Position in which sibling will be inserted. By default it will be inserted at the last position in parent.
   * @returns {Tree} A newly inserted sibling, or null if you are trying to make a sibling for the root.
   */
  public addSibling(sibling: Tree, position?: number): Tree {
    if (_.isArray(_.get(this.parent, 'children'))) {
      return this.parent.addChild(sibling, position);
    }
    return null;
  }

  /**
   * Adds a child node for the current node.
   * @param {Tree} child - A node that should become a child.
   * @param [number] position - Position in which child will be inserted. By default it will be inserted at the last position in parent.
   * @returns {Tree} A newly inserted child.
   */
  public addChild(child: Tree, position?: number): Tree {
    return this._addChild(Tree.cloneTreeShallow(child), position);
  }

  private _addChild(child: Tree, position: number = _.size(this._children) || 0): Tree {
    child.parent = this;

    if (Array.isArray(this._children)) {
      this._children.splice(position, 0, child);
    } else {
      this._children = [child];
    }
    return child;
  }

  /**
   * Swaps position of the current node with the given sibling.
   * @param {Tree} sibling - A sibling with which current node shold swap its position.
   */
  public swapWithSibling(sibling: Tree): void {
    if (!this.hasSibling(sibling)) {
      return;
    }

    const siblingIndex = sibling.positionInParent;
    const thisTreeIndex = this.positionInParent;

    this.parent._children[siblingIndex] = this;
    this.parent._children[thisTreeIndex] = sibling;
  }

  public get positionInParent(): number {
    return _.indexOf(this.parent.children, this);
  }

  public isStatic(): boolean {
    return _.get(this.node.settings, 'static', false);
  }

  public isLeaf(): boolean {
    return !this.isBranch();
  }

  public isBranch(): boolean {
    return Array.isArray(this._children);
  }

  public isRoot(): boolean {
    return this.parent === null;
  }

  public hasSibling(tree: Tree): boolean {
    return !this.isRoot() && _.includes(this.parent.children, tree);
  }

  public hasChild(tree: Tree): boolean {
    return _.includes(this._children, tree);
  }

  public removeChild(tree: Tree): void {
    const childIndex = _.findIndex(this._children, (child: Tree) => child === tree);
    if (childIndex >= 0) {
      this._children.splice(childIndex, 1);
    }
  }

  public removeItselfFromParent(): void {
    if (!this.parent) {
      return;
    }

    this.parent.removeChild(this);
  }

  public switchFoldingType(): void {
    if (this.isLeaf()) {
      return;
    }

    this.node._foldingType = this.isNodeExpanded() ? FoldingType.Collapsed : FoldingType.Expanded;
  }

  public isNodeExpanded(): boolean {
    return this.foldingType === FoldingType.Expanded;
  }

  public get foldingType(): FoldingType {
    if (!this.node._foldingType) {
      if (this._children) {
        this.node._foldingType = FoldingType.Expanded;
      } else {
        this.node._foldingType = FoldingType.Leaf;
      }
    }
    return this.node._foldingType;
  }

  public isNew(): boolean {
    return this.node._status === TreeStatus.New;
  }

  public markAsNew(): void {
    this.node._status = TreeStatus.New;
  }

  public isBeingRenamed(): boolean {
    return this.node._status === TreeStatus.IsBeingRenamed;
  }

  public markAsBeingRenamed(): void {
    this.node._status = TreeStatus.IsBeingRenamed;
  }

  public isModified(): boolean {
    return this.node._status === TreeStatus.Modified;
  }

  public markAsModified(): void {
    this.node._status = TreeStatus.Modified;
  }

  // STATIC METHODS ----------------------------------------------------------------------------------------------------

  public static buildTreeFromModel(model: TreeModel, parent: Tree = null): Tree {
    model.settings = TreeModelSettings.merge(model, _.get(parent, 'node') as TreeModel);
    const tree = new Tree(_.omit(model, 'children') as TreeModel, parent);

    _.forEach(model.children, (child: TreeModel, index: number) => {
      tree._addChild(Tree.buildTreeFromModel(child, tree), index);
    });

    return tree;
  }

  public static isValueEmpty(value: string): boolean {
    return _.isEmpty(_.trim(value));
  }

  public static isRenamable(value: any): value is RenamableNode {
    return (_.has(value, 'setName') && _.isFunction(value.setName))
      && (_.has(value, 'toString') && _.isFunction(value.toString) && value.toString !== Object.toString);
  }

  private static cloneTreeShallow(origin: Tree): Tree {
    const tree = new Tree(_.clone(origin.node));
    tree._children = origin._children;
    return tree;
  };

  private static applyNewValueToRenamable(value: RenamableNode, newValue: string): RenamableNode {
    const renamableValue: RenamableNode = _.merge({}, value as RenamableNode);
    renamableValue.setName(newValue);
    return renamableValue;
  }
}
