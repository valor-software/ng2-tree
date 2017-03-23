import * as _ from 'lodash';
import { Observable, Observer } from 'rxjs';
import { TreeModel, RenamableNode, FoldingType, TreeStatus, TreeModelSettings, ChildrenLoadingFunction } from './tree.types';

enum ChildrenLoadingState {
  NotStarted,
  Loading,
  Completed
}

export class Tree {
  private _children: Tree[];
  private _loadChildren: ChildrenLoadingFunction;
  private _childrenLoadingState: ChildrenLoadingState = ChildrenLoadingState.NotStarted;
  public node: TreeModel;
  public parent: Tree;

  /**
   * Build an instance of Tree from an object implementing TreeModel interface.
   * @param {TreeModel} model - A model that is used to build a tree.
   * @param {Tree} [parent] - An optional parent if you want to build a tree from the model that should be a child of an existing Tree instance.
   * @param {boolean} [isBranch] - An option that makes a branch from created tree. Branch can have children.
   */
  public constructor(node: TreeModel, parent: Tree = null, isBranch: boolean = false) {
    this.buildTreeFromModel(node, parent, isBranch);
  }

  private buildTreeFromModel(model: TreeModel, parent: Tree, isBranch: boolean): void {
    this.parent = parent;
    this.node = _.extend(_.omit(model, 'children') as TreeModel, {
      settings: TreeModelSettings.merge(model, _.get(parent, 'node') as TreeModel)
    }) as TreeModel;

    if (_.isFunction(this.node.loadChildren)) {
      this._loadChildren = this.node.loadChildren;
    } else {
      _.forEach(_.get(model, 'children') as TreeModel[], (child: TreeModel, index: number) => {
        this._addChild(new Tree(child, this), index);
      });
    }

    if (!Array.isArray(this._children)) {
      this._children = this.node.loadChildren || isBranch ? [] : null;
    }
  }

  /**
   * Check whether children of the node are being loaded.
   * Makes sense only for nodes that define `loadChildren` function.
   * @returns {boolean} A flag indicating that children are being loaded.
   */
  public childrenAreBeingLoaded(): boolean {
    return (this._childrenLoadingState === ChildrenLoadingState.Loading);
  }

  private canLoadChildren(): boolean {
    return (this._childrenLoadingState === ChildrenLoadingState.NotStarted)
     && (this.foldingType === FoldingType.Expanded)
     && (!!this._loadChildren);
  }

  /**
   * Check whether children of the node should be loaded and not loaded yet.
   * Makes sense only for nodes that define `loadChildren` function.
   * @returns {boolean} A flag indicating that children should be loaded for the current node.
   */
  public childrenShouldBeLoaded(): boolean {
    return !!this._loadChildren;
  }

  /**
   * Get children of the current tree.
   * @returns {Tree[]} The children of the current tree.
   */
  public get children(): Tree[] {
    return this._children;
  }

  /**
   * By getting value from this property you start process of loading node's children using `loadChildren` function.
   * Once children are loaded `loadChildren` function won't be called anymore and loaded for the first time children are emitted in case of subsequent calls.
   * @returns {Observable<Tree[]>} An observable which emits children once they are loaded.
   */
  public get childrenAsync(): Observable<Tree[]> {
    if(this.canLoadChildren()) {
      setTimeout(() => this._childrenLoadingState = ChildrenLoadingState.Loading);
      return new Observable((observer: Observer<Tree[]>) => {
        this._loadChildren((children: TreeModel[]) => {
          this._children = _.map(children, (child: TreeModel) => new Tree(child, this));
          this._childrenLoadingState = ChildrenLoadingState.Completed;
          observer.next(this.children);
          observer.complete();
        });
      });
    }

    return Observable.of(this.children);
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
   * Check whether or not this tree has a left menu.
   * @returns {boolean} A flag indicating whether or not this tree has a left menu.
   */
  public hasLeftMenu(): boolean {
    return !_.get(this.node.settings, 'static', false) && _.get(this.node.settings, 'leftMenu', false);
  }

  /**
   * Check whether or not this tree has a right menu.
   * @returns {boolean} A flag indicating whether or not this tree has a right menu.
   */
  public hasRightMenu(): boolean {
    return !_.get(this.node.settings, 'static', false) && _.get(this.node.settings, 'rightMenu', false);
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
   * Set a current folding type: expanded, collapsed or leaf.
   */
  private _setFoldingType(): void {
    if (this.childrenShouldBeLoaded()) {
      this.node._foldingType = FoldingType.Collapsed;
    } else if (this._children) {
      this.node._foldingType = FoldingType.Expanded;
    } else {
      this.node._foldingType = FoldingType.Leaf;
    }
  }

  /**
   * Get a current folding type: expanded, collapsed or leaf.
   * @returns {FoldingType} A folding type of the current tree.
   */
  public get foldingType(): FoldingType {
    if (!this.node._foldingType) {
      this._setFoldingType();
    }
    return this.node._foldingType;
  }

  /**
   * Get a css class for element which displayes folding state - expanded, collapsed or leaf
   * @returns {string} A string icontaining css class (classes)
   */
  public get foldingCssClass(): string {
    return this.getCssClassesFromSettings() || this.foldingType.cssClass;
  }

  private getCssClassesFromSettings(): string {
    if (!this.node._foldingType) {
      this._setFoldingType();
    }

    if (this.node._foldingType === FoldingType.Collapsed) {
       return _.get(this.node.settings, 'cssClasses.collapsed', null);
    } else if (this.node._foldingType === FoldingType.Expanded) {
       return _.get(this.node.settings, 'cssClasses.expanded', null);
    }

    return _.get(this.node.settings, 'cssClasses.leaf', null);
  }

  /**
   * Get a html template to render before every node's name.
   * @returns {string} A string representing a html template.
   */
  public get nodeTemplate(): string {
    return this.getTemplateFromSettings();
  }

  private getTemplateFromSettings(): string {
    if (this.isLeaf()) {
      return _.get(this.node.settings, 'templates.leaf', '');
    } else {
      return _.get(this.node.settings, 'templates.node', '');
    }
  }

  /**
   * Get a html template to render for an element activatin left menu of a node.
   * @returns {string} A string representing a html template.
   */
  public get leftMenuTemplate(): string {
    if (this.hasLeftMenu()) {
      return _.get(this.node.settings, 'templates.leftMenu', '<span></span>');
    }
    return '';
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
