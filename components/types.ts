export interface Tree {
  value: string;
  children?: Array<Tree>;
  status?: TreeStatus
}

export enum TreeStatus {
  New,
  Modified
}

export enum MouseButtons {
  Left = 1,
}