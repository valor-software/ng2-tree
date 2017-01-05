import * as _ from 'lodash';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  private _nodeType: string;

  public constructor(private _cssClass: string) {
    this._nodeType = this._cssClass.replace(/-(.)/, function (original, match) { return match.toUpperCase() });
  }

  public get cssClass(): string {
    return this._cssClass;
  }

  public getCssClass(treeOptions: TreeOptions, nodeOptions: TreeModelOptions): string {
    if (_.get(nodeOptions, 'icon.' + this._nodeType) !== undefined) {
      return nodeOptions.icon[this._nodeType];
    }

    if (_.get(treeOptions, 'icon.' + this._nodeType) !== undefined) {
      return treeOptions.icon[this._nodeType];
    }

    return this._cssClass;
  }
}

export interface NodeIconOptions {
  /* The class or classes when a node is collapsed */
  nodeCollapsed?: string;

  /* The class or classes when a node is expanded */
  nodeExpanded?: string;

  /* The class or classes when a node is a leaf */
  nodeLeaf?: string;
}

export class TreeOptions {
  /* icon - configure custom icon for the whole tree */
  icon?: NodeIconOptions;

  /* rightMenu - true / false - if true show a custom menu on right click on the
   * mouse
   */
  rightMenu?: boolean = true;

  /* mainMenu - true / false - if true show a custom menu in the top right
   * corner of the tree container
   */
  mainMenu?: boolean = false;

  /* expanded - true / false - if true expands all nodes on initial loading */
  expanded?: boolean = true;
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
  options?: TreeModelOptions;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;
}

export class TreeModelOptions {
  /* static - true / false - When true disables dragging of a node and dragging other
   * nodes below it
   */
  static?: boolean = false;

  /* drag - true / false - When false a node cannot be dragged, but other nodes
   * can be dragged below it (if it isn't a leaf)
   */
  drag?: boolean = true;

  /* icon - configure custom icon for a particular node or the whole subtree */
  icon?: NodeIconOptions;

  /* applyToSubtree - when true means that all configurations to a node will
   * apply to his children
   */
  applyToSubtree?: boolean = true;

  static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelOptions {
    /* Merge sourceA and sourceB only when applyToSubtree option is applied to the sourceB node */
    if (_.get(sourceB, 'options.applyToSubtree') === false) {
      return _.defaults({}, _.get(sourceA, 'options'), {static: false, drag: true, applyToSubtree: false});
    }

    return _.defaults({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), {static: false, drag: true, applyToSubtree: true});
  }
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

export interface NodeEvent {
  node: TreeModel;
}

export interface NodeSelectedEvent extends NodeEvent {
}

export interface NodeDestructiveEvent extends NodeEvent {
  parent: TreeModel;
}

export interface NodeMovedEvent extends NodeDestructiveEvent {
}

export interface NodeRemovedEvent extends NodeDestructiveEvent {
}

export interface NodeCreatedEvent extends NodeDestructiveEvent {
}

export interface NodeRenamedEvent extends NodeDestructiveEvent {
  newValue: string | RenamableNode;
  oldValue: string | RenamableNode;
}
