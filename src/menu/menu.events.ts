export enum NodeMenuItemAction {
  NewFolder,
  NewTag,
  Rename,
  Remove,
  Custom
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
  nodeMenuItemSelected?: string;
}
