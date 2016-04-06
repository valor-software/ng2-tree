import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Ng2TreeService {
    private menuEvents$:EventEmitter<any> = new EventEmitter();
    private cancelEvents$:EventEmitter<any> = new EventEmitter();
    private removeEvents$:EventEmitter<any> = new EventEmitter();
    
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