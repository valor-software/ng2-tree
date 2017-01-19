import { EventEmitter } from '@angular/core';

export class NodeMenuItemAction {
  public static NewNode: NodeMenuItemAction = new NodeMenuItemAction('NewFolder', undefined);
  public static NewLeaf: NodeMenuItemAction = new NodeMenuItemAction('NewTag', undefined);
  public static Rename: NodeMenuItemAction = new NodeMenuItemAction('Rename', undefined);
  public static Remove: NodeMenuItemAction = new NodeMenuItemAction('Remove', undefined);

  public name: string;
  public action: any;
  public constructor(name: string, action: any) {
    this.name = name;
    this.action = action;
  }
}

export enum NodeMenuAction {
  Close
}

export interface NodeMenuEvent {
  sender: HTMLElement;
  action: NodeMenuAction;
}

export interface NodeMenuItemSelectedEvent {
  nodeMenuItemAction: NodeMenuItemAction;
}
