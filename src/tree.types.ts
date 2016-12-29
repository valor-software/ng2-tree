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

  public getCssClass(options: TreeOptions, icon: IconOptions): string {
    if (icon !== undefined && icon[this._nodeType] !== undefined) {
      return icon[this._nodeType];
    }

    if (options !== undefined && options.icon.font !== 'None') {
      return options.icon[this._nodeType];
    }

    return this._cssClass;
  }
}

export interface TreeModel {
  value: string | RenamableNode;
  children?: Array<TreeModel>;
  icon?: IconOptions;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
  _indexInParent?: number;
}

export interface TreeOptions {
  icon?: IconOptions;
  activateRightMenu?: boolean;
  activateMainMenu?: boolean;
}

export interface IconOptions {
  font?: string;
  nodeCollapsed?: string;
  nodeExpanded?: string;
  nodeLeaf?: string;
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
