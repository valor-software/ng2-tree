import { Injectable, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { NodeMenuEvent, NodeMenuAction } from './menu.types';

@Injectable()
export class NodeMenuService {
  public nodeMenuEvents$: Subject<NodeMenuEvent> = new Subject<NodeMenuEvent>();

  public hideMenuEventStreamFor(treeElementRef: ElementRef): Observable<any> {
    return this.nodeMenuEvents$
      .filter((e: NodeMenuEvent) => treeElementRef.nativeElement !== e.sender)
      .filter((e: NodeMenuEvent) => e.action === NodeMenuAction.Close);
  }

  public hideMenuForAllNodesExcept(treeElementRef: ElementRef): void {
    this.nodeMenuEvents$.next({
      sender: treeElementRef.nativeElement,
      action: NodeMenuAction.Close
    });
  }
}
