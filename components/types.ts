export interface Tree {
  value: string;
  children?: Array<Tree>;
  status?: TreeStatus
}

export enum TreeStatus {
  New
}

export enum MouseButtons {
  Left = 1,
}