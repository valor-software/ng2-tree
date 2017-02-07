import { TreeModel } from '../tree.types';
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
