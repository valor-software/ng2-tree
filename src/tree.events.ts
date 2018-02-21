import { Tree } from './tree';
import { RenamableNode } from './tree.types';

export class NodeEvent {
  public constructor(public node: Tree) {}
}

export class NodeSelectedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeUnselectedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeDestructiveEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeMovedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree, public previousParent: Tree) {
    super(node);
  }
}

export class NodeRemovedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree, public lastIndex: number) {
    super(node);
  }
}

export class NodeCreatedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeRenamedEvent extends NodeDestructiveEvent {
  public constructor(node: Tree, public oldValue: string | RenamableNode, public newValue: string | RenamableNode) {
    super(node);
  }
}

export class NodeExpandedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeCollapsedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class MenuItemSelectedEvent extends NodeEvent {
  public constructor(node: Tree, public selectedItem: string) {
    super(node);
  }
}

export class LoadNextLevelEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeCheckedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeUncheckedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}

export class NodeIndeterminedEvent extends NodeEvent {
  public constructor(node: Tree) {
    super(node);
  }
}
