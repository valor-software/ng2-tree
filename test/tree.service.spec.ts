import { TestBed } from '@angular/core/testing';
import { TreeService } from '../src/tree.service';
import { Subject } from 'rxjs/Rx';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { Tree } from '../src/tree';
import { TreeController } from '../src/tree-controller';
import { TreeInternalComponent } from '../src/tree-internal.component';
import {
  NodeRemovedEvent,
  NodeMovedEvent,
  NodeCreatedEvent,
  NodeSelectedEvent,
  NodeRenamedEvent,
  NodeExpandedEvent,
  NodeCollapsedEvent
} from '../src/tree.events';
import { ElementRef } from '@angular/core';
import { NodeDraggableEvent } from '../src/draggable/draggable.events';
import { CapturedNode } from '../src/draggable/captured-node';

let treeService;
let draggableService;

describe('TreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeService, NodeDraggableService]
    });

    treeService = TestBed.get(TreeService);
    draggableService = TestBed.get(NodeDraggableService);
  });

  it('should be created by angular', () => {
    expect(treeService).not.toBeNull();
    expect(treeService.nodeMoved$ instanceof Subject).toBe(true);
    expect(treeService.nodeRemoved$ instanceof Subject).toBe(true);
    expect(treeService.nodeRenamed$ instanceof Subject).toBe(true);
    expect(treeService.nodeCreated$ instanceof Subject).toBe(true);
    expect(treeService.nodeSelected$ instanceof Subject).toBe(true);
    expect(treeService.nodeExpanded$ instanceof Subject).toBe(true);
    expect(treeService.nodeCollapsed$ instanceof Subject).toBe(true);
  });

  it('fires node removed events', () => {
    spyOn(treeService.nodeRemoved$, 'next');

    const tree = new Tree({value: 'Master'});
    treeService.fireNodeRemoved(tree);

    expect(treeService.nodeRemoved$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeRemoved$.next).toHaveBeenCalledWith(new NodeRemovedEvent(tree));
  });

  it('fires node moved events', () => {
    spyOn(treeService.nodeMoved$, 'next');

    const parent = new Tree({value: 'Master Pa'});
    const tree = new Tree({value: 'Master'}, parent);

    treeService.fireNodeMoved(tree, parent);

    expect(treeService.nodeMoved$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeMoved$.next).toHaveBeenCalledWith(new NodeMovedEvent(tree, parent));
  });

  it('fires node created events', () => {
    spyOn(treeService.nodeCreated$, 'next');

    const tree = new Tree({value: 'Master'});
    treeService.fireNodeCreated(tree);

    expect(treeService.nodeCreated$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCreated$.next).toHaveBeenCalledWith(new NodeCreatedEvent(tree, undefined));
  });

  it('fires node selected events', () => {
    spyOn(treeService.nodeSelected$, 'next');

    const tree = new Tree({value: 'Master'});

    treeService.fireNodeSelected(tree);

    expect(treeService.nodeSelected$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeSelected$.next).toHaveBeenCalledWith(new NodeSelectedEvent(tree));
  });

  it('fires node renamed events', () => {
    spyOn(treeService.nodeRenamed$, 'next');

    const tree = new Tree({value: 'Master'});

    treeService.fireNodeRenamed('Bla', tree);

    expect(treeService.nodeRenamed$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeRenamed$.next).toHaveBeenCalledWith(new NodeRenamedEvent(tree, 'Bla', tree.value));
  });

  it('fires node expanded events', () => {
    spyOn(treeService.nodeExpanded$, 'next');

    const tree = new Tree({value: 'Master'});

    treeService.fireNodeExpanded(tree);

    expect(treeService.nodeExpanded$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeExpanded$.next).toHaveBeenCalledWith(new NodeExpandedEvent(tree));
  });

  it('fires node collapsed events', () => {
    spyOn(treeService.nodeCollapsed$, 'next');

    const tree = new Tree({value: 'Master'});

    treeService.fireNodeCollapsed(tree);

    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCollapsed$.next).toHaveBeenCalledWith(new NodeCollapsedEvent(tree));
  });

  it('fires events on which other tree should remove selection', done => {
    const selectedTree = new Tree({value: 'Master'});

    const tree = new Tree({value: 'Master'});
    treeService.unselectStream(tree)
      .subscribe((e: NodeSelectedEvent) => {
        expect(e.node).toBe(selectedTree);
        done();
      });

    treeService.fireNodeSelected(selectedTree);
  });

  it('removes node from parent when when appropriate event fires', done => {
    const masterTree = new Tree({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const servantNumber1Tree = masterTree.children[0];
    const servantNumber2Tree = masterTree.children[1];

    treeService.nodeRemoved$.subscribe((e: NodeRemovedEvent) => {
      expect(e.node).toBe(servantNumber1Tree);
      expect(masterTree.children.length).toEqual(1);
      expect(masterTree.children[0]).toBe(servantNumber2Tree);
      done();
    });

    treeService.fireNodeRemoved(servantNumber1Tree);
  });

  it('should produce drag event for the same element and not on captured node children', done => {
    const masterTree = new Tree({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    const tree = new Tree({value: 'tree'});

    const elementRef = new ElementRef(null);

    treeService.draggedStream(tree, elementRef)
      .subscribe((e: NodeDraggableEvent) => {
        expect(e.captured.tree).toBe(masterTree);
        expect(e.captured.element).toBe(elementRef);
        done();
      });

    draggableService.fireNodeDragged(new CapturedNode(elementRef, masterTree), elementRef);
  });

  it('does not fire "expanded", "collapsed" events for a leaf node', () => {
    const masterTree = new Tree({
      value: 'Master'
    });

    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');

    treeService.fireNodeSwitchFoldingType(masterTree);

    expect(treeService.nodeExpanded$.next).not.toHaveBeenCalled();
    expect(treeService.nodeCollapsed$.next).not.toHaveBeenCalled();
  });

  it('does not fire "expanded", "collapsed" events for a empty node', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: []
    });

    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');

    treeService.fireNodeSwitchFoldingType(masterTree);

    expect(treeService.nodeExpanded$.next).not.toHaveBeenCalled();
    expect(treeService.nodeCollapsed$.next).not.toHaveBeenCalled();
  });

  it('fires "expanded" event for expanded tree', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');

    treeService.fireNodeSwitchFoldingType(masterTree);

    expect(treeService.nodeExpanded$.next).toHaveBeenCalled();
    expect(treeService.nodeCollapsed$.next).not.toHaveBeenCalled();
  });

  it('fires "collapsed" event for not expanded tree', () => {
    const masterTree = new Tree({
      value: 'Master',
      children: [
        {value: 'Servant#1'},
        {value: 'Servant#2'}
      ]
    });

    masterTree.switchFoldingType();

    spyOn(treeService.nodeExpanded$, 'next');
    spyOn(treeService.nodeCollapsed$, 'next');

    treeService.fireNodeSwitchFoldingType(masterTree);

    expect(treeService.nodeCollapsed$.next).toHaveBeenCalled();
    expect(treeService.nodeExpanded$.next).not.toHaveBeenCalled();
  });
});
