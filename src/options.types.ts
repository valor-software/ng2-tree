import { MenuItemAction } from './menu/menu.types';
import { FoldingType, TreeModel } from './tree.types';
import * as _ from 'lodash';

export interface CssClasses {
  /* The class or classes for an icon of a node */
  nodeIcon?: string;

  /* The class or classes for an icon of a leaf node */
  leafIcon?: string;

  /* The class or classes when a node is collapsed */
  nodeCollapsed?: string;

  /* The class or classes when a node is expanded */
  nodeExpanded?: string;

  /* The class or classes when a node is a leaf */
  nodeLeaf?: string;

  /* The class or classes for left menu */
  leftMenu?: string;
}

export class MenuItem {
  name?: string;
  actionName?: string;
  actionFunction?: any;
  action?: MenuItemAction;
  cssClass?: string;

  static proccessItems(menuItems: Array<MenuItem>): Array<MenuItem> {
    for (let menuItem of menuItems) {
      if (menuItem.actionFunction !== undefined) {
        menuItem.action = new MenuItemAction('Custom', menuItem.actionFunction)
      } else if (menuItem.actionName !== undefined) {
        menuItem.action = MenuItemAction[menuItem.actionName]
      }
    }

    return menuItems;
  }
}

export class MenuOptions {
  options?: Array<MenuItem>;
  style?: any;

  constructor(base: any) {
    this.options = base === undefined ? undefined : base.options;
    this.style = base === undefined ? '' : base.style;
  }

  static getMainMenuItems(menuOptions: MenuOptions, tree: TreeModel): Array<MenuItem> {
    if (_.get(menuOptions, 'options', undefined) === undefined) {
      return [
        {
          name: 'New Leaf',
          action: MenuItemAction.NewLeaf,
          cssClass: _.get(tree, 'options.cssClasses.leafIcon', 'new-leaf')
        },
        {
          name: 'New Node',
          action: MenuItemAction.NewNode,
          cssClass: _.get(tree, 'options.cssClasses.nodeIcon', 'new-node')
        }
      ];
    }

    return MenuItem.proccessItems(menuOptions.options);
  }

  static getNodeMenuItems(menuOptions: MenuOptions, tree: TreeModel): Array<MenuItem> {
    if (menuOptions === undefined || menuOptions.options === undefined) {
      return [
        {
          name: 'New Leaf',
          action: MenuItemAction.NewLeaf,
          cssClass: _.get(tree, 'options.cssClasses.leafIcon', 'new-leaf')
        },
        {
          name: 'New Node',
          action: MenuItemAction.NewNode,
          cssClass: _.get(tree, 'options.cssClasses.nodeIcon', 'new-node')
        },
        {
          name: 'Rename',
          action: MenuItemAction.Rename,
          cssClass: 'rename'
        },
        {
          name: 'Remove',
          action: MenuItemAction.Remove,
          cssClass: 'remove'
        }
      ];
    }

    return MenuItem.proccessItems(menuOptions.options);
  }

  public get menuClass(): string {
    if (this.style !== undefined && this.style.menu !== undefined) {
      return this.style.menu;
    }

    return 'menu';
  }

}

export class Options {
  /* cssClasses - configure custom icon for the whole tree */
  cssClasses?: CssClasses;

  /* rightMenu - true / false - if true show a custom menu on right click on the
   * mouse
   */
  rightMenu?: boolean = true;

  /* rightMenuOptions - object containing all menu configurations for the right
   * menu
   */
  rightMenuOptions?: MenuOptions;

  /* leftMenu - true / false - if true show a custom menu next to node value
   */
  leftMenu?: boolean = false;

  /* leftMenuOptions - object containing all menu configurations for the left
   * menu
   */
  leftMenuOptions?: MenuOptions;

  /* expanded - true / false - if true expands all nodes on initial loading */
  expanded?: boolean = true;
}

export class TreeOptions extends Options {
  /* mainMenu - true / false - if true show a custom menu in the top right
   * corner of the tree container
   */
  mainMenu?: boolean = false;

  /* mainMenuOptions - object containing all menu configurations for the main
   * menu
   */
  mainMenuOptions?: MenuOptions;

  /* selectEvent - true / false - if true select event is independent event
   * if false select event acts like collapse or expand
   */
  selectEvent: boolean = true;

  /* editOnDoubleClick - true / false
   * if true - when double click on a node is gets in edit mode
   * if false - nothing changes
   */
  editOnDouleClick: boolean = false;

  /* expandEmptyNode - true / false
   * true - a node can be expanded and collapsed
   * false - a node can be expanded only when there are children
   */
  expandEmptyNode?: boolean = true;

  /* lazyLoading - true / false
   * true - children of a node are not in the structure
   * false - children are loaded on initialize
   */
  lazyLoading?: boolean = false;
}

export class TreeModelOptions extends Options{
  /* static - true / false - When true disables dragging of a node and dragging other
   * nodes below it
   */
  static?: boolean = false;

  /* drag - true / false - When false a node cannot be dragged, but other nodes
   * can be dragged below it (if it isn't a leaf)
   */
  drag?: boolean = true;

  /* selected - true / false - When true means that a node will be selected
   * this property do not apply to the subtree never
   */
  selected?: boolean = false;

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
      let result: TreeModelOptions = new TreeModelOptions();
      result = Object.assign(result, base);
      result.selected = false;
      return result;
    }
  }

  static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelOptions {
    /* Merge sourceA and sourceB only when applyToSubtree option is applied to the sourceB node */
    let defaults:TreeModelOptions = {static: false, drag: true, applyToSubtree: true};

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
    let defaults: TreeModelOptions = _.defaultsDeep({}, TreeModelOptions.convert(treeOptions));

    if (_.get(sourceB, 'options.applyToSubtree') === false) {
      defaults.applyToSubtree = false;
      return _.defaultsDeep({}, _.get(sourceA, 'options'), defaults);
    }

    return _.defaultsDeep({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), defaults);
  }
}
