import { TestBed } from '@angular/core/testing';
import { TreeService } from '../src/tree.service';
import { Subject } from 'rxjs/Rx';
import { NodeDraggableService } from '../src/draggable/node-draggable.service';
import { Tree } from '../src/tree';
import {
  NodeRemovedEvent,
  NodeMovedEvent,
  NodeCreatedEvent,
  NodeSelectedEvent,
  NodeRenamedEvent
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

    treeService.fireNodeCreated(tree, parent);

    expect(treeService.nodeCreated$.next).toHaveBeenCalledTimes(1);
    expect(treeService.nodeCreated$.next).toHaveBeenCalledWith(new NodeCreatedEvent(tree));
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
});
