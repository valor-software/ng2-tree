import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {NodeMenuEvent, NodeMenuAction} from './types';

@Injectable()
export class NodeMenuService {
  public nodeMenuEvents$: Subject<NodeMenuEvent> = new Subject<NodeMenuEvent>();

  public constructor() {
    document.addEventListener('keyup', (event: any) => {
      if (event.keyCode === 27) {
        this.nodeMenuEvents$.next({sender: event.target, action: NodeMenuAction.Close});
      }
    });

    document.addEventListener('click', (event: MouseEvent) => {
      this.nodeMenuEvents$.next({sender: event.target, action: NodeMenuAction.Close});
    });
  }
}
