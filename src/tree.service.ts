import {
  NodeRemovedEvent, NodeRenamedEvent, NodeCreatedEvent, NodeSelectedEvent, NodeMovedEvent,
  TreeModel, RenamableNode
} from './tree.types';
import { Subject, Observable } from 'rxjs/Rx';
import { Injectable, Inject, ElementRef } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeDraggableEventAction, NodeDraggableEvent } from './draggable/draggable.types';

import * as TypeUtils from './utils/type.utils';
import * as _ from 'lodash';

interface DraggableEventHandlerOptions {
  tree: TreeModel,
  parentTree: TreeModel,
  treeElementRef: ElementRef
}

@Injectable()
export class TreeService {
  public nodeMoved$: Subject<NodeMovedEvent> = new Subject<NodeMovedEvent>();
  public nodeRemoved$: Subject<NodeRemovedEvent> = new Subject<NodeRemovedEvent>();
  public nodeRenamed$: Subject<NodeRenamedEvent> = new Subject<NodeRenamedEvent>();
  public nodeCreated$: Subject<NodeCreatedEvent> = new Subject<NodeCreatedEvent>();
  public nodeSelected$: Subject<NodeSelectedEvent> = new Subject<NodeSelectedEvent>();

  public constructor(@Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService) {
    this.nodeRemoved$.subscribe(this.onChildRemoved);
  }

  public toNodeValue(options): RenamableNode | string {
    const {currentValue, newValue} = options;

    if (TypeUtils.isValueEmpty(newValue)) {
      return currentValue;
    }

    if (TypeUtils.isRenamable(currentValue)) {
      return TypeUtils.applyNewValueToRenamable(currentValue as RenamableNode, newValue);
    }

    return newValue;
  }

  public unSelectEventStreamFor(tree: TreeModel): Observable<any> {
    return this.nodeSelected$
      .filter((e: NodeSelectedEvent) => tree !== e.node);
  }

  public removeNode(tree: TreeModel, parentTree: TreeModel): void {
    this.nodeRemoved$.next({node: tree, parent: parentTree});
  }

  public createNode(tree: TreeModel, parentTree: TreeModel): void {
    this.nodeCreated$.next({node: tree, parent: parentTree});
  }

  public selectNode(tree: TreeModel): void {
    this.nodeSelected$.next({node: tree});
  }

  public renameNode(newValue: RenamableNode | string, tree: TreeModel, parentTree: TreeModel): void {
    const oldValue = tree.value;
    tree.value = newValue;

    this.nodeRenamed$.next({
      node: tree,
      parent: parentTree,
      oldValue,
      newValue
    });
  }

  public addDragNDropBehaviourTo(options: DraggableEventHandlerOptions): void {
    const {tree, parentTree, treeElementRef} = options;

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action === NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.captured.element === treeElementRef)
      .subscribe((e: NodeDraggableEvent) => this.nodeRemoved$.next({node: e.captured.tree, parent: parentTree}));

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action !== NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.target === treeElementRef)
      .filter((e: NodeDraggableEvent) => !this.hasChild(e.captured.tree, tree))
      .subscribe((e: NodeDraggableEvent) => {
        if (this.isSibling(e.captured.tree, parentTree)) {
          return this.swapWithSibling(e.captured.tree, parentTree, tree);
        }

        if (TypeUtils.isFolder(tree)) {
          return this.moveNodeToThisTreeAndRemoveFromPreviousOne(e, tree);
        } else {
          return this.moveNodeToParentTreeAndRemoveFromPreviousOne(e, tree, parentTree);
        }
      });
  }

  private onChildRemoved(e: NodeRemovedEvent): void {
    const childIndex = _.findIndex(e.parent.children, (child: any) => child === e.node);
    if (childIndex >= 0) {
      e.parent.children.splice(childIndex, 1);
    }
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent, tree: TreeModel): void {
    tree.children.push(e.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));

    this.nodeMoved$.next({
      node: e.captured.tree,
      parent: tree
    });
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent, tree: TreeModel, parentTree: TreeModel): void {
    parentTree.children.splice(tree._indexInParent, 0, e.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));

    this.nodeMoved$.next({
      node: e.captured.tree,
      parent: parentTree
    });
  }

  private hasChild(child: TreeModel, tree: TreeModel): boolean {
    return _.includes(tree.children, child);
  }

  private isSibling(child: TreeModel, parentTree: TreeModel): boolean {
    return parentTree && _.includes(parentTree.children, child);
  }

  private swapWithSibling(sibling: TreeModel, parentTree: TreeModel, tree: TreeModel): void {
    const siblingIndex = parentTree.children.indexOf(sibling);
    const thisTreeIndex = parentTree.children.indexOf(tree);

    parentTree.children[siblingIndex] = tree;
    parentTree.children[thisTreeIndex] = sibling;

    tree._indexInParent = siblingIndex;
    sibling._indexInParent = thisTreeIndex;

    this.nodeMoved$.next({node: tree, parent: parentTree});
  }
}
