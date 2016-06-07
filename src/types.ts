export interface TreeModel {
  value: string;
  children?: Array<TreeModel>;
  status?: TreeStatus
}

export enum TreeStatus {
  New,
  Modified
}

export enum MouseButtons {
  Left = 1,
}

export enum NodeMenuItemAction {
  NewFolder,
  NewTag,
  Rename,
  Remove
}

export interface NodeMenuItemSelectedEvent {
  nodeMenuItemAction: NodeMenuItemAction
}

export interface NodeEditableEvent {
  value: any,
  type: string
}
