import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Tree} from "./types";

@Injectable()
export class Ng2TreeService {
  private menuEvents$: EventEmitter<any> = new EventEmitter();
  sourceElement: any;
  private dragNDropEvents$: EventEmitter<any> = new EventEmitter();

  constructor() {
    document.addEventListener('keyup', (event: any) => {
      if (event.keyCode === 27) {
        this.emitMenuEvent({sender: event.target, action: 'close'});
      }
    });

    document.addEventListener('click', (event: any) => {
      this.emitMenuEvent({sender: event.target, action: 'close'});
    });
  }

  dragNDropEventStream(): Observable<any> {
    return this.dragNDropEvents$;
  }

  emitDragNDropEvent(event: any): void {
    this.dragNDropEvents$.emit(event);
  }

  menuEventStream(): Observable<any> {
    return this.menuEvents$;
  }

  emitMenuEvent(event: any): void {
    this.menuEvents$.emit(event);
  }
}
