import {
  inject,
  async,
  tick,
  getTestBed,
  TestBed
} from '@angular/core/testing';

import { Subject } from 'rxjs';

import { NodeDraggableService } from '../../src/draggable/node-draggable.service';
import { CapturedNode } from '../../src/draggable/captured-node';
import { NodeDraggableEvent } from '../../src/draggable/draggable.types';

describe('NodeDraggableService', function () {
  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          NodeDraggableService
        ]
      });
  });

  it('should have draggable event bus set up', inject([NodeDraggableService], (nodeDraggableService) => {
      expect(nodeDraggableService).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$).not.toBeNull();
      expect(nodeDraggableService.draggableNodeEvents$ instanceof Subject).toBe(true);
  }));

  it('should have captured node undefined right after creation', inject([NodeDraggableService], (nodeDraggableService) => {
      const capturedNode = nodeDraggableService.getCapturedNode();
      expect(capturedNode).toBeUndefined();
  }));

  it('should capture node', inject([NodeDraggableService], (nodeDraggableService) => {
      const stubCapturedNode = new CapturedNode(null, null);

      nodeDraggableService.captureNode(stubCapturedNode);
      const actualCapturedNode = nodeDraggableService.getCapturedNode(stubCapturedNode);

      expect(actualCapturedNode).toBe(stubCapturedNode);
  }));
});
