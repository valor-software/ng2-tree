import * as _ from 'lodash';
import { TreeOptions, TreeModelOptions, MenuOptions } from './options.types';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  private _nodeType: string;

  public constructor(private _cssClass: string) {
    this._nodeType = this._cssClass.replace(/-(.)/, function (original, match) { return match.toUpperCase() });
  }

  public get cssClass(): string {
    return this._cssClass;
  }

  public getCssClass(nodeOptions: TreeModelOptions): string {
    if (_.get(nodeOptions, 'cssClasses.' + this._nodeType) !== undefined) {
      return nodeOptions.cssClasses[this._nodeType];
    }

    return this._cssClass;
  }
}

export interface TreeApi {
  select: any;
  deselect: any;
  expand: any;
  collapse: any;
  service: any;
}

export interface TreeSystems {
  isSelected?: boolean;
  isExpanded?: boolean;
  isLeaf?: boolean;
  isRightMenuVisible?: boolean;
  isLeftMenuVisible?: boolean;
  foldingType?: FoldingType;
  status?: TreeStatus;
  indexInParent?: number;
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
  hasNodeChildren?: boolean;
  hasLeafChildren?: boolean;
  id?: string | number;
  api?: TreeApi;
  systems?: TreeSystems;
  parentId?: string | number;
  options?: TreeModelOptions;
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

export interface NodeExpandedEvent extends NodeEvent {
}

export interface NodeCollapsedEvent extends NodeEvent {
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

export interface NodeCustomEvent extends NodeDestructiveEvent {
}
