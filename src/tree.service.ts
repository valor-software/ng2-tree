import {
  LoadNextLevelEvent,
  MenuItemSelectedEvent,
  NodeCheckedEvent,
  NodeCollapsedEvent,
  NodeCreatedEvent,
  NodeExpandedEvent,
  NodeIndeterminedEvent,
  NodeMovedEvent,
  NodeRemovedEvent,
  NodeRenamedEvent,
  NodeSelectedEvent,
  NodeUncheckedEvent,
  NodeUnselectedEvent
} from './tree.events';
import { RenamableNode } from './tree.types';
import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeDraggableEvent } from './draggable/draggable.events';
import { isEmpty } from './utils/fn.utils';

@Injectable()
export class TreeService {
  public nodeMoved$: Subject<NodeMovedEvent> = new Subject<NodeMovedEvent>();
  public nodeRemoved$: Subject<NodeRemovedEvent> = new Subject<NodeRemovedEvent>();
  public nodeRenamed$: Subject<NodeRenamedEvent> = new Subject<NodeRenamedEvent>();
  public nodeCreated$: Subject<NodeCreatedEvent> = new Subject<NodeCreatedEvent>();
  public nodeSelected$: Subject<NodeSelectedEvent> = new Subject<NodeSelectedEvent>();
  public nodeUnselected$: Subject<NodeUnselectedEvent> = new Subject<NodeUnselectedEvent>();
  public nodeExpanded$: Subject<NodeExpandedEvent> = new Subject<NodeExpandedEvent>();
  public nodeCollapsed$: Subject<NodeCollapsedEvent> = new Subject<NodeCollapsedEvent>();
  public menuItemSelected$: Subject<MenuItemSelectedEvent> = new Subject<MenuItemSelectedEvent>();
  public loadNextLevel$: Subject<LoadNextLevelEvent> = new Subject<LoadNextLevelEvent>();
  public nodeChecked$: Subject<NodeCheckedEvent> = new Subject<NodeCheckedEvent>();
  public nodeUnchecked$: Subject<NodeUncheckedEvent> = new Subject<NodeUncheckedEvent>();
  public nodeIndetermined$: Subject<NodeIndeterminedEvent> = new Subject<NodeIndeterminedEvent>();

  private controllers: Map<string | number, TreeController> = new Map();

  public constructor(@Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService) {
    this.nodeRemoved$.subscribe((e: NodeRemovedEvent) => e.node.removeItselfFromParent());
  }

  public unselectStream(tree: Tree): Observable<NodeSelectedEvent> {
    return this.nodeSelected$.filter((e: NodeSelectedEvent) => tree !== e.node);
  }

  public fireNodeRemoved(tree: Tree): void {
    this.nodeRemoved$.next(new NodeRemovedEvent(tree, tree.positionInParent));
  }

  public fireNodeCreated(tree: Tree): void {
    this.nodeCreated$.next(new NodeCreatedEvent(tree));
  }

  public fireNodeSelected(tree: Tree): void {
    this.nodeSelected$.next(new NodeSelectedEvent(tree));
  }

  public fireNodeUnselected(tree: Tree): void {
    this.nodeUnselected$.next(new NodeUnselectedEvent(tree));
  }

  public fireNodeRenamed(oldValue: RenamableNode | string, tree: Tree): void {
    this.nodeRenamed$.next(new NodeRenamedEvent(tree, oldValue, tree.value));
  }

  public fireNodeMoved(tree: Tree, parent: Tree): void {
    this.nodeMoved$.next(new NodeMovedEvent(tree, parent));
  }

  public fireMenuItemSelected(tree: Tree, selectedItem: string): void {
    this.menuItemSelected$.next(new MenuItemSelectedEvent(tree, selectedItem));
  }

  public fireNodeSwitchFoldingType(tree: Tree): void {
    if (tree.isNodeExpanded()) {
      this.fireNodeExpanded(tree);
      if (this.shouldFireLoadNextLevel(tree)) {
        this.fireLoadNextLevel(tree);
      }
    } else if (tree.isNodeCollapsed()) {
      this.fireNodeCollapsed(tree);
    }
  }

  private fireNodeExpanded(tree: Tree): void {
    this.nodeExpanded$.next(new NodeExpandedEvent(tree));
  }

  private fireNodeCollapsed(tree: Tree): void {
    this.nodeCollapsed$.next(new NodeCollapsedEvent(tree));
  }

  private fireLoadNextLevel(tree: Tree): void {
    this.loadNextLevel$.next(new LoadNextLevelEvent(tree));
  }

  public fireNodeChecked(tree: Tree): void {
    this.nodeChecked$.next(new NodeCheckedEvent(tree));
  }

  public fireNodeUnchecked(tree: Tree): void {
    this.nodeUnchecked$.next(new NodeUncheckedEvent(tree));
  }

  public draggedStream(tree: Tree, element: ElementRef): Observable<NodeDraggableEvent> {
    return this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.target === element)
      .filter((e: NodeDraggableEvent) => !e.captured.tree.hasChild(tree));
  }

  public setController(id: string | number, controller: TreeController): void {
    this.controllers.set(id, controller);
  }

  public deleteController(id: string | number): void {
    if (this.controllers.has(id)) {
      this.controllers.delete(id);
    }
  }

  public getController(id: string | number): TreeController {
    if (this.controllers.has(id)) {
      return this.controllers.get(id);
    }

    return null;
  }

  public hasController(id: string | number): boolean {
    return this.controllers.has(id);
  }

  private shouldFireLoadNextLevel(tree: Tree): boolean {
    const shouldLoadNextLevel =
      tree.node.emitLoadNextLevel &&
      !tree.node.loadChildren &&
      !tree.childrenAreBeingLoaded() &&
      isEmpty(tree.children);

    if (shouldLoadNextLevel) {
      tree.loadingChildrenRequested();
    }

    return shouldLoadNextLevel;
  }

  public fireNodeIndetermined(tree: Tree): void {
    this.nodeIndetermined$.next(new NodeIndeterminedEvent(tree));
  }
}
