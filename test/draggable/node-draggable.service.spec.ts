import { inject, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { NodeDraggableService } from '../../src/draggable/node-draggable.service';
import { CapturedNode } from '../../src/draggable/captured-node';
import { ElementRef } from '@angular/core';
import { NodeDraggableEvent } from '../../src/draggable/draggable.events';
import { Tree } from '../../src/tree';

describe('NodeDraggableService', function() {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeDraggableService]
    });
  });

  it(
    'should have draggable event bus set up',
    inject([NodeDraggableService], nodeDraggableService => {
      expect(nodeDraggableService).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$ instanceof Subject).toBe(true);
    })
  );

  it(
    'should have captured node undefined right after creation',
    inject([NodeDraggableService], nodeDraggableService => {
      const capturedNode = nodeDraggableService.getCapturedNode();
      expect(capturedNode).toBeUndefined();
    })
  );

  it(
    'should fire node dragged event',
    inject([NodeDraggableService], nodeDraggableService => {
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');

      const stubCapturedNode = new CapturedNode(null, new Tree({ value: 'Master' }));
      const target = new ElementRef({});

      nodeDraggableService.fireNodeDragged(stubCapturedNode, target);

      expect(nodeDraggableService.draggableNodeEvents$.next).toHaveBeenCalledTimes(1);

      const event: NodeDraggableEvent = nodeDraggableService.draggableNodeEvents$.next.calls.argsFor(0)[0];
      expect(event.target).toBe(target);
      expect(event.captured).toBe(stubCapturedNode);
    })
  );

  it(
    'should not fire event if node is static',
    inject([NodeDraggableService], nodeDraggableService => {
      const masterTree = new Tree({
        value: 'Master',
        settings: {
          static: true
        }
      });

      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');

      const elementRef = new ElementRef(null);
      nodeDraggableService.fireNodeDragged(new CapturedNode(elementRef, masterTree), elementRef);
      expect(nodeDraggableService.draggableNodeEvents$.next).not.toHaveBeenCalled();
    })
  );

  it(
    'should not fire event if there is no tree in captured node',
    inject([NodeDraggableService], nodeDraggableService => {
      spyOn(nodeDraggableService.draggableNodeEvents$, 'next');

      const elementRef = new ElementRef(null);
      nodeDraggableService.fireNodeDragged(new CapturedNode(elementRef, null), elementRef);
      expect(nodeDraggableService.draggableNodeEvents$.next).not.toHaveBeenCalled();
    })
  );

  it(
    'should capture node',
    inject([NodeDraggableService], nodeDraggableService => {
      const stubCapturedNode = new CapturedNode(null, null);

      nodeDraggableService.captureNode(stubCapturedNode);
      const actualCapturedNode = nodeDraggableService.getCapturedNode(stubCapturedNode);

      expect(actualCapturedNode).toBe(stubCapturedNode);
    })
  );

  it(
    'should release captured node',
    inject([NodeDraggableService], nodeDraggableService => {
      const stubCapturedNode = new CapturedNode(null, null);

      nodeDraggableService.captureNode(stubCapturedNode);
      expect(nodeDraggableService.getCapturedNode(stubCapturedNode)).toBe(stubCapturedNode);

      nodeDraggableService.releaseCapturedNode();
      expect(nodeDraggableService.getCapturedNode(stubCapturedNode)).toBeNull();
    })
  );
});
