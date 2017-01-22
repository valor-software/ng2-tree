import {
  NodeRemovedEvent,
  NodeRenamedEvent,
  NodeCreatedEvent,
  NodeSelectedEvent,
  NodeMovedEvent,
  RenamableNode,
  Tree
} from './tree.types';
import { Subject, Observable } from 'rxjs/Rx';
import { Injectable, Inject, ElementRef } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeDraggableEvent } from './draggable/draggable.types';

export interface DraggableEventHandlerOptions {
  tree: Tree;
  treeElementRef: ElementRef;
}

@Injectable()
export class TreeService {
  public nodeMoved$: Subject<NodeMovedEvent> = new Subject<NodeMovedEvent>();
  public nodeRemoved$: Subject<NodeRemovedEvent> = new Subject<NodeRemovedEvent>();
  public nodeRenamed$: Subject<NodeRenamedEvent> = new Subject<NodeRenamedEvent>();
  public nodeCreated$: Subject<NodeCreatedEvent> = new Subject<NodeCreatedEvent>();
  public nodeSelected$: Subject<NodeSelectedEvent> = new Subject<NodeSelectedEvent>();

  public constructor(@Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService) {
    this.nodeRemoved$.subscribe((e: NodeRemovedEvent) => e.node.removeItselfFromParent());
  }

  public unselectEventStream(tree: Tree): Observable<any> {
    return this.nodeSelected$.filter((e: NodeSelectedEvent) => tree !== e.node);
  }

  public fireNodeRemoved(tree: Tree): void {
    this.nodeRemoved$.next(new NodeRemovedEvent(tree));
  }

  public fireNodeCreated(tree: Tree): void {
    this.nodeCreated$.next(new NodeCreatedEvent(tree));
  }

  public fireNodeSelected(tree: Tree): void {
    this.nodeSelected$.next(new NodeSelectedEvent(tree));
  }

  public fireNodeRenamed(oldValue: RenamableNode | string, tree: Tree): void {
    this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
  }

  public fireNodeMoved(tree: Tree, parent: Tree): void {
    this.nodeMoved$.next(new NodeMovedEvent(tree, parent));
  }

  public addDragNDropBehaviourTo(options: DraggableEventHandlerOptions): void {
    const {tree, treeElementRef} = options;

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.target === treeElementRef)
      .filter((e: NodeDraggableEvent) => !e.captured.tree.hasChild(tree))
      .subscribe((e: NodeDraggableEvent) => {
        if (tree.hasSibling(e.captured.tree)) {
          return this.swapWithSibling(e.captured.tree, tree);
        }

        if (tree.isBranch()) {
          return this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, tree);
        } else {
          return this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, tree);
        }
      });
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent, tree: Tree): void {
    this.fireNodeRemoved(e.captured.tree);

    const addedChild = tree.addChild(e.captured.tree);

    this.fireNodeMoved(addedChild, e.captured.tree.parent);
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent, tree: Tree): void {
    this.fireNodeRemoved(e.captured.tree);

    const addedSibling = tree.addSibling(e.captured.tree, tree.positionInParent);

    this.fireNodeMoved(addedSibling, e.captured.tree.parent);
  }

  private swapWithSibling(sibling: Tree, tree: Tree): void {
    tree.swapWithSibling(sibling);

    this.fireNodeMoved(sibling, sibling.parent);
  }
}
