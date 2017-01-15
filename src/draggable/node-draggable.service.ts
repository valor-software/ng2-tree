import { Injectable, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { CapturedNode } from './captured-node';
import { NodeDraggableEvent } from './draggable.types';

@Injectable()
export class NodeDraggableService {
  public draggableNodeEvents$: Subject<NodeDraggableEvent> = new Subject<NodeDraggableEvent>();

  private capturedNode: CapturedNode;

  public fireNodeDragged(captured: CapturedNode, target: ElementRef): void {
    this.draggableNodeEvents$.next(new NodeDraggableEvent(captured, target));
  }

  public captureNode(node: CapturedNode): void {
    this.capturedNode = node;
  }

  public getCapturedNode(): CapturedNode {
    return this.capturedNode;
  }

  public releaseCapturedNode(): void {
    this.capturedNode = null;
  }
}
