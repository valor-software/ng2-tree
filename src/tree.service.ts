import {Injectable, EventEmitter, ElementRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CapturedNode, NodeDraggableEvent} from './types';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class TreeService {
  private menuEvents$: EventEmitter<any> = new EventEmitter();

  //TODO: Move into DraggableNodeService
  public draggableNodeEvents$: Subject<NodeDraggableEvent> = new Subject<NodeDraggableEvent>();

  //TODO: Move into DraggableNodeService
  private capturedNode: CapturedNode;

  public constructor() {
    document.addEventListener('keyup', (event: any) => {
      if (event.keyCode === 27) {
        this.emitMenuEvent({sender: event.target, action: 'close'});
      }
    });

    document.addEventListener('click', (event: any) => {
      this.emitMenuEvent({sender: event.target, action: 'close'});
    });
  }

  //TODO: Move into DraggableNodeService
  public captureNode(node: CapturedNode): void {
    this.capturedNode = node;
  }

  //TODO: Move into DraggableNodeService
  public getCapturedNode(): CapturedNode {
    return this.capturedNode;
  }

  //TODO: Move into DraggableNodeService
  public releaseCapturedNode(): void {
    this.capturedNode = null;
  }

  public menuEventStream(): Observable<any> {
    return this.menuEvents$;
  }

  public emitMenuEvent(event: any): void {
    this.menuEvents$.emit(event);
  }
}
