import * as _ from 'lodash';
import { TreeModel, RenamableNode, FoldingType, TreeStatus, TreeModelSettings } from './tree.types';

export class Tree {
  private _children: Tree[];

  public constructor(public node: TreeModel, public parent: Tree = null, isBranch: boolean = false) {
    this._children = isBranch ? [] : null;
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
   * @param {boolean} isBranch - A flag that indicates whether a new node should be a "Branch". "Leaf" node will be created by default
   * @returns {Tree} A newly created child node.
   */
  public createNode(isBranch: boolean): Tree {
    const tree = new Tree({ value: '' }, null, isBranch);
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
   * Add a sibling node for the current node. This won't work if the current node is a root.
   * @param {Tree} sibling - A node that should become a sibling.
   * @param [number] position - Position in which sibling will be inserted. By default it will be inserted at the last position in a parent.
   * @returns {Tree} A newly inserted sibling, or null if you are trying to make a sibling for the root.
   */
  public addSibling(sibling: Tree, position?: number): Tree {
    if (_.isArray(_.get(this.parent, 'children'))) {
      return this.parent.addChild(sibling, position);
    }
    return null;
  }

  /**
   * Add a child node for the current node.
   * @param {Tree} child - A node that should become a child.
   * @param [number] position - Position in which child will be inserted. By default it will be inserted at the last position in a parent.
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
   * Swap position of the current node with the given sibling. If node passed as a parameter is not a sibling - nothing happens.
   * @param {Tree} sibling - A sibling with which current node shold be swapped.
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

  /**
   * Get a node's position in its parent.
   * @returns {number} The position inside a parent.
   */
  public get positionInParent(): number {
    return _.indexOf(this.parent.children, this);
  }

  /**
   * Check whether or not this tree is static.
   * @returns {boolean} A flag indicating whether or not this tree is static.
   */
  public isStatic(): boolean {
    return _.get(this.node.settings, 'static', false);
  }

  /**
   * Check whether this tree is "Leaf" or not.
   * @returns {boolean} A flag indicating whether or not this tree is a "Leaf".
   */
  public isLeaf(): boolean {
    return !this.isBranch();
  }

  /**
   * Check whether this tree is "Branch" or not. "Branch" is a node that has children.
   * @returns {boolean} A flag indicating whether or not this tree is a "Branch".
   */
  public isBranch(): boolean {
    return Array.isArray(this._children);
  }

  /**
   * Check whether this tree is a root or not. The root is the tree (node) that doesn't have parent (or technically its parent is null).
   * @returns {boolean} A flag indicating whether or not this tree is the root.
   */
  public isRoot(): boolean {
    return this.parent === null;
  }

  /**
   * Check whether provided tree is a sibling of the current tree. Sibling trees (nodes) are the trees that have the same parent.
   * @param {Tree} tree - A tree that should be tested on a siblingness.
   * @returns {boolean} A flag indicating whether or not provided tree is the sibling of the current one.
   */
  public hasSibling(tree: Tree): boolean {
    return !this.isRoot() && _.includes(this.parent.children, tree);
  }

  /**
   * Check whether provided tree is a child of the current tree.
   * This method tests that provided tree is a <strong>direct</strong> child of the current tree.
   * @param {Tree} tree - A tree that should be tested (child candidate).
   * @returns {boolean} A flag indicating whether provided tree is a child or not.
   */
  public hasChild(tree: Tree): boolean {
    return _.includes(this._children, tree);
  }

  /**
   * Remove given tree from the current tree.
   * The given tree will be removed only in case it is a direct child of the current tree (@see {@link hasChild}).
   * @param {Tree} tree - A tree that should be removed.
   */
  public removeChild(tree: Tree): void {
    const childIndex = _.findIndex(this._children, (child: Tree) => child === tree);
    if (childIndex >= 0) {
      this._children.splice(childIndex, 1);
    }
  }

  /**
   * Remove current tree from its parent.
   */
  public removeItselfFromParent(): void {
    if (!this.parent) {
      return;
    }

    this.parent.removeChild(this);
  }

  /**
   * Switch folding type of the current tree. "Leaf" node cannot switch its folding type cause it doesn't have children, hence nothing to fold.
   * If node is a "Branch" and it is expanded, then by invoking current method state of the tree should be switched to "collapsed" and vice versa.
   */
  public switchFoldingType(): void {
    if (this.isLeaf()) {
      return;
    }

    this.node._foldingType = this.isNodeExpanded() ? FoldingType.Collapsed : FoldingType.Expanded;
  }

  /**
   * Check that tree is expanded.
   * @returns {boolean} A flag indicating whether current tree is expanded. Always returns false for the "Leaf" tree.
   */
  public isNodeExpanded(): boolean {
    return this.foldingType === FoldingType.Expanded;
  }

  /**
   * Get a current folding type: expanded, collapsed or leaf.
   * @returns {FoldingType} A folding type of the current tree.
   */
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

  /**
   * Check that current tree is newly created (added by user via menu for example). Tree that was built from the TreeModel is not marked as new.
   * @returns {boolean} A flag whether the tree is new.
   */
  public isNew(): boolean {
    return this.node._status === TreeStatus.New;
  }

  /**
   * Mark current tree as new (@see {@link isNew}).
   */
  public markAsNew(): void {
    this.node._status = TreeStatus.New;
  }

  /**
   * Check that current tree is being renamed (it is in the process of its value renaming initiated by a user).
   * @returns {boolean} A flag whether the tree is being renamed.
   */
  public isBeingRenamed(): boolean {
    return this.node._status === TreeStatus.IsBeingRenamed;
  }

  /**
   * Mark current tree as being renamed (@see {@link isBeingRenamed}).
   */
  public markAsBeingRenamed(): void {
    this.node._status = TreeStatus.IsBeingRenamed;
  }

  /**
   * Check that current tree is modified (for example it was renamed).
   * @returns {boolean} A flag whether the tree is modified.
   */
  public isModified(): boolean {
    return this.node._status === TreeStatus.Modified;
  }

  /**
   * Mark current tree as modified (@see {@link isModified}).
   */
  public markAsModified(): void {
    this.node._status = TreeStatus.Modified;
  }

  // STATIC METHODS ----------------------------------------------------------------------------------------------------

  /**
   * Build an instance of Tree from an object implementing TreeModel interface.
   * @param {TreeModel} model - A model that is used to build a tree.
   * @param {Tree} [parent] - An optional parent if you want to build a tree from the model that should be a child of an existing Tree instance.
   * @returns {Tree} A tree build from given model (with parent if it was given)
   * @static
   */
  public static buildTreeFromModel(model: TreeModel, parent: Tree = null): Tree {
    model.settings = TreeModelSettings.merge(model, _.get(parent, 'node') as TreeModel);
    const tree = new Tree(_.omit(model, 'children') as TreeModel, parent);

    _.forEach(model.children, (child: TreeModel, index: number) => {
      tree._addChild(Tree.buildTreeFromModel(child, tree), index);
    });

    return tree;
  }

  /**
   * Check that value passed is not empty (it doesn't consist of only whitespace symbols).
   * @param {string} value - A value that should be checked.
   * @returns {boolean} - A flag indicating that value is empty or not.
   * @static
   */
  public static isValueEmpty(value: string): boolean {
    return _.isEmpty(_.trim(value));
  }

  /**
   * Check whether a given value can be considered RenamableNode.
   * @param {any} value - A value to check.
   * @returns {boolan} - A flag indicating whether given value is Renamable node or not.
   * @static
   */
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
