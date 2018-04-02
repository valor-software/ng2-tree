import { defaultsDeep, get, omit } from './utils/fn.utils';
import { NodeMenuItem } from './menu/node-menu.component';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Empty: FoldingType = new FoldingType('node-empty');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  public constructor(private _cssClass: string) {}

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
  emitLoadNextLevel?: boolean;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  [additionalData: string]: any;
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
   * "menu" property when set will be available as custom context menu.
   * @name TreeModelSettings#MenuItems
   * @type NodeMenuItem
   */
  public menuItems?: NodeMenuItem[];

  /**
   * "static" property when set to true makes it impossible to drag'n'drop tree or call a menu on it.
   * @name TreeModelSettings#static
   * @type boolean
   * @default false
   */
  public static?: boolean;

  public isCollapsedOnInit?: boolean;

  public checked?: boolean;

  public selectionAllowed?: boolean;

  public keepNodesInDOM?: boolean;

  public static readonly NOT_CASCADING_SETTINGS = ['selectionAllowed'];

  public static merge(child: TreeModel, parent: TreeModel): TreeModelSettings {
    const parentCascadingSettings = omit(get(parent, 'settings'), TreeModelSettings.NOT_CASCADING_SETTINGS);
    return defaultsDeep({}, get(child, 'settings'), parentCascadingSettings, {
      static: false,
      leftMenu: false,
      rightMenu: true,
      isCollapsedOnInit: false,
      checked: false,
      keepNodesInDOM: false,
      selectionAllowed: true
    });
  }
}

export class Ng2TreeSettings {
  /**
   * Indicates root visibility in the tree. When true - root is invisible.
   * @name Ng2TreeSettings#rootIsVisible
   * @type boolean
   */
  rootIsVisible? = true;
  showCheckboxes? = false;
  enableCheckboxes? = true;
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
