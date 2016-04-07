import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Ng2TreeService {
    private menuEvents$:EventEmitter<any> = new EventEmitter();
    private cancelEvents$:EventEmitter<any> = new EventEmitter();
    private removeEvents$:EventEmitter<any> = new EventEmitter();
    public root: any;
  
    constructor() {
      window.addEventListener('keyup', (event: any) => {
      if (event.keyCode === 27) {
        this.emitMenuEvent({sender: null, action: 'close'});
      }
    });
    
    
    window.addEventListener('click', (event: any) => {
        this.emitMenuEvent({sender: null, action: 'close'});
    });
    }
  
    menuEventStream(): Observable<any> {
      return this.menuEvents$;
    }
  
    emitMenuEvent(event: any): void {
      this.menuEvents$.emit(event);
    }
    
    
    removeNodeEventStream(): Observable<any> {
      return this.removeEvents$;
    }
    
    emitRemoveEvent(event: any): void {
      this.removeEvents$.emit(event);
    }

    cancelEventStream(): Observable<any> {
      return this.cancelEvents$;
    }
  
    emitCancelEvent(event: any): void {
      this.cancelEvents$.emit(event);
    }
}