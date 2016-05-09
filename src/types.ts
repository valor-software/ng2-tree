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