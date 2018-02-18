import { ElementRef } from '@angular/core';
import { CapturedNode } from './captured-node';

export class NodeDraggableEvent {
  public constructor(public captured: CapturedNode, public target: ElementRef) {}
}
