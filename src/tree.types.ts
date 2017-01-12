import * as _ from 'lodash';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  public constructor(private _cssClass: string) {
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: TreeModel[];
  options?: TreeModelOptions;
  _isLeaf?: boolean;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;
}

export class TreeModelOptions {
  public static: boolean = false;

  public static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelOptions {
    return _.defaults({}, _.get(sourceA, 'options'), _.get(sourceB, 'options'), {static: false});
  }
}

export class TreeViewOptions {
  public rootIsVisible: boolean = true;
}

export enum TreeStatus {
  New,
  Modified,
  EditInProgress
}

export interface RenamableNode {
  setName(name: string): void;
  toString(): string;
}

export interface NodeEvent {
  node: TreeModel;
}

export interface NodeSelectedEvent extends NodeEvent {
}

export interface NodeDestructiveEvent extends NodeEvent {
  parent: TreeModel;
}

export interface NodeMovedEvent extends NodeDestructiveEvent {
}

export interface NodeRemovedEvent extends NodeDestructiveEvent {
}

export interface NodeCreatedEvent extends NodeDestructiveEvent {
}

export interface NodeRenamedEvent extends NodeDestructiveEvent {
  newValue: string | RenamableNode;
  oldValue: string | RenamableNode;
}
