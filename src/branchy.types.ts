export enum FoldingType {
  Expanded,
  Collapsed,
  Leaf
}

export type FoldingTypeCssClass = 'node-expanded' | 'node-collapsed' | 'node-leaf';

export interface TreeEvent {
  node: TreeModel
}

export interface TreeModel {
  value: string;
  children?: Array<TreeModel>;
  status?: TreeStatus,
  foldingType?: FoldingType,
  indexInParent?: number
}

export enum TreeStatus {
  New,
  Modified,
  EditInProgress
}
