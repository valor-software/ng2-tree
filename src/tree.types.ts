import * as _ from 'lodash';
import { MenuOptions } from './menu/menu.types.ts';

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

  public getCssClass(nodeOptions: TreeModelOptions): string {
    if (_.get(nodeOptions, 'icon.' + this._nodeType) !== undefined) {
      return nodeOptions.icon[this._nodeType];
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

  /* nodeMenuOptions - object containing all menu configurations */
  menuOptions?: MenuOptions;

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

  /* rightMenu - true / false - if true show a custom menu on right click on the
   * mouse
   */
  rightMenu?: boolean = true;

  /* nodeMenuOptions - object containing all menu configurations */
  menuOptions?: MenuOptions;

  /* expanded - true / false - if true expands all nodes on initial loading */
  expanded?: boolean = true;

  /* applyToSubtree - when true means that all configurations to a node will
   * apply to his children
   */
  applyToSubtree?: boolean = true;

  static convert(base: TreeOptions): TreeModelOptions {
    if (base === undefined) {
      return {
        static: false,
        drag: true,
        applyToSubtree: true
      };
    } else {
      var result: TreeModelOptions = {
        icon: {},
        rightMenu: base.rightMenu,
        expanded: base.expanded,
        applyToSubtree: true
      };
      result.icon = _.defaults(result.icon, base.icon);
      return result;
    }
  }

  static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelOptions {
    /* Merge sourceA and sourceB only when applyToSubtree option is applied to the sourceB node */
    var defaults:TreeModelOptions = {static: false, drag: true, applyToSubtree: true};

    if (_.get(sourceB, 'options.applyToSubtree') === false) {
      defaults.applyToSubtree = false;
      return _.defaults({}, _.get(sourceA, 'options'), _.get(defaults, ''));
    }

    return _.defaults({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), _.get(defaults, ''));
  }

  static getOptions(sourceA: TreeModel, sourceB: TreeModel, treeOptions: TreeOptions): TreeModelOptions {
    /*
     * Merge sourceA and sourceB only when applyToSubtree option is applied to the sourceB node
     * For default values take from TreeOptions
     */
    var defaults:TreeModelOptions = _.defaultsDeep({}, TreeModelOptions.convert(treeOptions), );

    if (_.get(sourceB, 'options.applyToSubtree') === false) {
      defaults.applyToSubtree = false;
      return _.defaultsDeep({}, _.get(sourceA, 'options'), defaults);
    }

    return _.defaultsDeep({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), defaults);
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

export interface NodeCustomEvent extends NodeDestructiveEvent {
}
