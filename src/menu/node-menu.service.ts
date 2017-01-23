import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { MenuEvent } from './menu.types';

@Injectable()
export class NodeMenuService {
  public nodeMenuEvents$: Subject<MenuEvent> = new Subject<MenuEvent>();
}
