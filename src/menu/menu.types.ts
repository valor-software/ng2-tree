import * as _ from 'lodash';

export class MenuItemAction {
  public static NewNode: MenuItemAction = new MenuItemAction('NewFolder', undefined);
  public static NewLeaf: MenuItemAction = new MenuItemAction('NewTag', undefined);
  public static Rename: MenuItemAction = new MenuItemAction('Rename', undefined);
  public static Remove: MenuItemAction = new MenuItemAction('Remove', undefined);

  public name: string;
  public action: any;
  public constructor(name: string, action: any) {
    this.name = name;
    this.action = action;
  }
}

export enum MenuAction {
  Close
}

export interface MenuEvent {
  sender: HTMLElement;
  action: MenuAction;
}

export interface MenuItemSelectedEvent {
  nodeMenuItemAction: MenuItemAction;
}

export interface MenuStyles {
  menu?: string;
  button?: string;
  buttonIcon?: string;
  buttonIconCollapsed?: string;
  buttonIconExpanded?: string;
  buttonText?: string;
  menuContent?: string;
  menuContentCollapsed?: string;
  menuContentExpanded?: string;
  menuItem?: string;
  menuItemIcon?: string;
  menuItemText?: string;
}

export class MenuOptions {
  options?: Array<MenuItem>;
  style?: MenuStyles;

  constructor(base: any) {
    this.options = base === undefined ? undefined : base.options;
    this.style = base === undefined ? '' : base.style;
  }

  static getMainMenuItems(menuOptions: MenuOptions): Array<MenuItem> {
    if (menuOptions === undefined || menuOptions.options === undefined) {
      return [
        {
          name: 'New Leaf',
          action: MenuItemAction.NewLeaf,
          cssClass: 'new-leaf'
        },
        {
          name: 'New Node',
          action: MenuItemAction.NewNode,
          cssClass: 'new-node'
        }
      ];
    }

    return MenuItem.proccessItems(menuOptions.options);
  }

  static getRightMenuItems(menuOptions: MenuOptions): Array<MenuItem> {
    if (menuOptions === undefined || menuOptions.options === undefined) {
      return [
        {
          name: 'New Leaf',
          action: MenuItemAction.NewLeaf,
          cssClass: 'new-leaf'
        },
        {
          name: 'New Node',
          action: MenuItemAction.NewNode,
          cssClass: 'new-node'
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

  public get buttonClass(): string {
    if (this.style !== undefined && this.style.button !== undefined) {
      return this.style.button
    }

    return 'menu-button';
  }

  public get buttonIconClass(): string {
    if (this.style !== undefined && this.style.buttonIcon !== undefined) {
      return this.style.buttonIcon;
    }

    return 'menu-button-icon';
  }

  public get buttonIconCollapsedClass(): string {
    if (this.style !== undefined && this.style.buttonIconCollapsed !== undefined) {
      return this.style.buttonIconCollapsed;
    }

    return 'collapsed';
  }

  public get buttonIconExpandedClass(): string {
    if (this.style !== undefined && this.style.buttonIconExpanded !== undefined) {
      return this.style.buttonIconExpanded;
    }

    return 'expanded';
  }

  public get buttonTextClass(): string {
    if (this.style !== undefined && this.style.buttonText !== undefined) {
      return this.style.buttonText;
    }

    return 'menu-button-text';
  }

  public get menuContentClass(): string {
    if (this.style !== undefined && this.style.menuContent !== undefined) {
      return this.style.menuContent;
    }

    return 'menu-content';
  }

  public get menuContentCollapsedClass(): string {
    if (this.style !== undefined && this.style.menuContentCollapsed !== undefined) {
      return this.style.menuContentCollapsed;
    }

    return 'collapsed';
  }

  public get menuContentExpandedClass(): string {
    if (this.style !== undefined && this.style.menuContentExpanded !== undefined) {
      return this.style.menuContentExpanded;
    }

    return 'expanded';
  }

  public get menuItemClass(): string {
    if (this.style !== undefined && this.style.menuItem !== undefined) {
      return this.style.menuItem;
    }

    return 'menu-item';
  }

  public get menuItemIconClass(): string {
    if (this.style !== undefined && this.style.menuItemIcon !== undefined) {
      return this.style.menuItemIcon;
    }

    return 'menu-item-icon';
  }

  public get menuItemTextClass(): string {
    if (this.style !== undefined && this.style.menuItemText !== undefined) {
      return this.style.menuItemText;
    }

    return 'menu-item-text';
  }
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
