import * as _ from 'lodash';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  public constructor(private _cssClass: string) {
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: TreeModel[];
  options?: TreeModelOptions;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;
}

export class TreeModelOptions {
  public static: boolean = false;

  public static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelOptions {
    return _.defaults({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), {static: false});
  }
}

export class TreeViewOptions {
  public rootIsVisible: boolean = true;
}

export enum TreeStatus {
  New,
  Modified,
  EditInProgress
}

export interface RenamableNode {
  setName(name: string): void;
  toString(): string;
}

export class Tree {
  private _children: Tree[] = null;

  public constructor(public node: TreeModel, public parent: Tree = null) {
  }

  public static buildTree(model: TreeModel, parent: Tree = null): Tree {
    model.options = TreeModelOptions.merge(model, _.get(parent, 'node') as TreeModel);
    model._indexInParent = model._indexInParent || 0;

    const tree = new Tree(_.omit(model, 'children') as TreeModel, parent);

    _.forEach(model.children, (child: TreeModel, index: number) => {
      child._indexInParent = index;
      tree._addChild(Tree.buildTree(child, tree));
    });

    return tree;
  }

  public get children(): Tree[] {
    return this._children;
  }

  public createNode(isFolder: boolean): Tree {
    if (this.isLeaf()) {
      return this.createSibling(isFolder);
    } else {
      return this.createChild(isFolder);
    }
  };

  public cloneTreeShallow(origin: Tree): Tree {
    const tree = new Tree(_.clone(origin.node));
    tree._children = origin._children;
    return tree;
  };

  private createChild(isFolder: boolean): Tree {
    const child = new Tree({value: '', _status: TreeStatus.New}, this);
    child._children = isFolder ? [] : null;
    this._children.push(child);
    return child;
  };

  private createSibling(isFolder: boolean): Tree {
    const sibling = new Tree({value: '', _status: TreeStatus.New}, this.parent);
    sibling._children = isFolder ? [] : null;
    this.parent._children.push(sibling);
    return sibling;
  };

  public get value(): any {
    return this.node.value;
  }

  public set value(value: any) {
    if (typeof value === 'string' && Tree.isValueEmpty(value)) {
      return;
    }

    if (Tree.isRenamable(this.value)) {
      this.node.value = this.applyNewValueToRenamable(this.value as RenamableNode, typeof value === 'string' ? value : _.toString(value));
    } else {
      this.node.value = _.toString(value);
    }
  }

  public addChild(child: Tree): Tree {
    const newChild = this.cloneTreeShallow(child);
    newChild.parent = this;
    newChild.node._indexInParent =  _.size(this._children) || 0;
    return this._addChild(newChild);
  }

  private _addChild(child: Tree): Tree {
    if (_.isArray(this._children)) {
      this._children.push(child);
    } else {
      this._children = [child];
    }
    return child;
  }

  public addChildAt(child: Tree, position: number): Tree {
    const newChild = this.cloneTreeShallow(child);
    newChild.parent = this;
    newChild.node._indexInParent = position;
    if (_.isArray(this._children)) {
      this._children.splice(position, 0, newChild);
    } else {
      this._children = [newChild];
    }
    return newChild;
  }

  public addSiblingAt(child: Tree, position: number): Tree {
    if (_.isArray(_.get(this.parent, 'children'))) {
      return this.parent.addChildAt(child, position);
    }
    return null;
  }

  public get positionInParent(): number {
    return this.node._indexInParent;
  }

  public isStatic(): boolean {
    return _.get(this.node, 'options.static', false);
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

  public isSibling(tree: Tree): boolean {
    return !this.isRoot() && _.includes(this.parent.children, tree);
  }

  public isChild(tree: Tree): boolean {
    return _.includes(this._children, tree);
  }

  public removeChild(tree: Tree): void {

    const childIndex = _.findIndex(this._children, (child: Tree) => child === tree);
    if (childIndex >= 0) {
      this._children.splice(childIndex, 1);
    }
  }

  public removeItselfFromParent(): void {
    this.parent.removeChild(this);
  }

  public switchFoldingType(): void {
    if (this.node._foldingType !== FoldingType.Leaf) {
      this.node._foldingType = this.getNextFoldingType();
    }
  }

  public getNextFoldingType(): FoldingType {
    if (this.node._foldingType === FoldingType.Expanded) {
      return FoldingType.Collapsed;
    }
    return FoldingType.Expanded;
  }

  public isNodeExpanded(): boolean {
    return this.node._foldingType === FoldingType.Expanded;
  }

  public swapWithSibling(sibling: Tree): void {
    const siblingIndex = this.parent._children.indexOf(sibling);
    const thisTreeIndex = this.parent._children.indexOf(this);

    this.parent._children[siblingIndex] = this;
    this.parent._children[thisTreeIndex] = sibling;

    this.node._indexInParent = siblingIndex;
    sibling.node._indexInParent = thisTreeIndex;
  }

  public getFoldingTypeCssClass(): string {
    if (!this.node._foldingType) {
      if (this._children) {
        this.node._foldingType = FoldingType.Expanded;
      } else {
        this.node._foldingType = FoldingType.Leaf;
      }
    }
    return this.node._foldingType.cssClass;
  }

  public isEditInProgressOrNew(): boolean {
    return this.isEditInProgress() || this.isNew();
  }

  public isEditInProgress(): boolean {
    return this.node._status === TreeStatus.EditInProgress;
  }

  public markAsEditInProgress(): void {
    this.node._status = TreeStatus.EditInProgress;
  }

  public markAsModified(): void {
    this.node._status = TreeStatus.Modified;
  }

  private applyNewValueToRenamable(value: RenamableNode, newValue: string): RenamableNode {
    const renamableValue: RenamableNode = _.merge({}, value as RenamableNode);
    renamableValue.setName(newValue);
    return renamableValue;
  }

  public static isValueEmpty(value: string): boolean {
    return _.isEmpty(_.trim(value));
  }

  public static isRenamable(value: any): value is RenamableNode {
    return (_.has(value, 'setName') && _.isFunction(value.setName))
      && (_.has(value, 'toString') && _.isFunction(value.toString) && value.toString !== Object.toString);
  }

  public isNew(): boolean {
    return this.node._status === TreeStatus.New;
  }
}

export class NodeEvent {
  public constructor(public node: Tree) {
  }
}

export class NodeSelectedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeDestructiveEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeMovedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree, public previousParent: Tree) {
    super(node);
  }
}

export class NodeRemovedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeCreatedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeRenamedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree, public newValue: string | RenamableNode, public oldValue: string | RenamableNode) {
    super(node);
  }
}
