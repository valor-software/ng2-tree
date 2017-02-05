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
  settings?: TreeModelSettings;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
}

export class TreeModelSettings {
  public static?: boolean;

  public static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelSettings {
    return _.defaults({}, _.get(sourceA, 'settings'), _.get(sourceB, 'settings'), {static: false});
  }
}

export interface Ng2TreeSettings {
  rootIsVisible?: boolean;
}

export enum TreeStatus {
  New,
  Modified,
  IsBeingRenamed
}

export interface RenamableNode {
  setName(name: string): void;
  toString(): string;
}
