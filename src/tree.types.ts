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

  public getCssClass(options: TreeOptions, icon: NodeIconOptions): string {
    if (icon !== undefined && icon[this._nodeType] !== undefined) {
      return icon[this._nodeType];
    }

    if (options !== undefined && options.icon.font !== 'None') {
      return options.icon[this._nodeType];
    }

    return this._cssClass;
  }
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
  options?: TreeModelOptions;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;
}

export class TreeOptions {
  /* icon - configure custom icon for the whole tree */
  icon?: NodeIconOptions;
  /* activateRightMenu - allow to activate or disable right menu on click of the nodes */
  activateRightMenu?: boolean = true;
  /* activateRightMenu - allow to activate or disable main menu */
  activateMainMenu?: boolean = false;
  /* expanded - when true makes all nodes to be expanded, when false collapes all */
  expanded?: boolean = true;
}

export class NodeIconOptions {
  font: string = 'None';
  nodeCollapsed?: string;
  nodeExpanded?: string;
  nodeLeaf?: string;
}

export class TreeModelOptions {
  static?: boolean = false;

  /* disableDraging - when true disable the option to drag the node to
   * other places - nodes, but allow to drag other nodes under it
   */
  disableDraging?: boolean = false;

  /* icon - configure custom icon for a particular node or the whole subtree */
  icon?: NodeIconOptions;

  /* applyToSubtree - when true means that all configurations to a node will
   * apply to his children
   */
  applyToSubtree?: boolean = true;

  static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelOptions {
    /* Merge sourceA and sourceB only when applyToSubtree option is applied to the sourceB node */
    if (_.get(sourceB, 'options.applyToSubtree')) {
      return _.defaults({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), {static: false, disableDraging: false, applyToSubtree: true});
    }

    return _.defaults({}, _.get(sourceA, 'options'), {static: false, disableDraging: false, applyToSubtree: false});
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
