import { get, defaultsDeep } from './utils/fn.utils';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Empty: FoldingType = new FoldingType('node-empty');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  public constructor(private _cssClass: string) {
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}

export type ChildrenLoadingFunction = (callback: (children: TreeModel[]) => void) => void;

export interface TreeModel {
  value: string | RenamableNode;
  id?: string | number;
  children?: TreeModel[];
  loadChildren?: ChildrenLoadingFunction;
  settings?: TreeModelSettings;
  hasChildren?: boolean;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  }

export interface CssClasses {
  /* The class or classes that should be added to the expanded node */
  expanded?: string;

  /* The class or classes that should be added to the collapsed node */
  collapsed?: string;

  /* The class or classes that should be added to the empty node */
  empty?: string;

  /* The class or classes that should be added to the expanded to the leaf */
  leaf?: string;
}

export interface Templates {
  /* A template for a node */
  node?: string;

  /* A template for a leaf node */
  leaf?: string;

  /* A template for left menu html element */
  leftMenu?: string;
}

export class TreeModelSettings {
  /* cssClasses - set custom css classes which will be used for a tree */
  public cssClasses?: CssClasses;

  /* Templates - set custom html templates to be used in a tree */
  public templates?: Templates;

  /**
   * "leftMenu" property when set to true makes left menu available.
   * @name TreeModelSettings#leftMenu
   * @type boolean
   * @default false
   */
  public leftMenu?: boolean;

  /**
   * "rightMenu" property when set to true makes right menu available.
   * @name TreeModelSettings#rightMenu
   * @type boolean
   * @default true
   */
  public rightMenu?: boolean;

  /**
   * "static" property when set to true makes it impossible to drag'n'drop tree or call a menu on it.
   * @name TreeModelSettings#static
   * @type boolean
   * @default false
   */
  public static?: boolean;

  public static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelSettings {
    return defaultsDeep({}, get(sourceA, 'settings'), get(sourceB, 'settings'), {static: false, leftMenu: false, rightMenu: true});
  }
}

export interface Ng2TreeSettings {
  /**
   * Indicates root visibility in the tree. When true - root is invisible.
   * @name Ng2TreeSettings#rootIsVisible
   * @type boolean
   */
  rootIsVisible?: boolean;
}

export enum TreeStatus {
  New,
  Modified,
  IsBeingRenamed
}

export interface RenamableNode {
  /**
   * Set new value of the renamable node. Implementation of this method is up to user.
   * @param {string} name - A new value of the node.
   */
  setName(name: string): void;

  /**
   * Get string representation of the node. Implementation of this method is up to user.
   * @returns {string} - A node string representation.
   */
  toString(): string;
}
