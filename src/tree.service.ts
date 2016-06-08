import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TreeService {
  private menuEvents$: EventEmitter<any> = new EventEmitter();

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

  public menuEventStream(): Observable<any> {
    return this.menuEvents$;
  }

  public emitMenuEvent(event: any): void {
    this.menuEvents$.emit(event);
  }
}
