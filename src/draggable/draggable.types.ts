import {ElementRef} from '@angular/core';
import {CapturedNode} from './captured-node';

export enum NodeDraggableEventAction {
  Remove
}

export interface NodeDraggableEvent {
  captured: CapturedNode;
  target: ElementRef;
  action?: NodeDraggableEventAction;
}
