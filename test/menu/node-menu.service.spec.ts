import { TestBed } from '@angular/core/testing';
import { NodeMenuService } from '../../src/menu/node-menu.service';
import { ElementRef } from '@angular/core';
import { NodeMenuEvent, NodeMenuAction } from '../../src/menu/menu.events';
import { Subject } from 'rxjs';

let nodeMenuService;

describe('NodeMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeMenuService]
    });

    nodeMenuService = TestBed.inject(NodeMenuService);
  });

  it('should be created by angular', () => {
    expect(nodeMenuService).not.toBeNull();
    expect(nodeMenuService.nodeMenuEvents$ instanceof Subject).toBe(true);
  });

  it('should fire close menu events', done => {
    const elementRef = new ElementRef<HTMLElement>(document.createElement('div'));
    const initiatorElementRef = new ElementRef<HTMLElement>(document.createElement('div'));

    nodeMenuService.hideMenuStream(elementRef).subscribe((e: NodeMenuEvent) => {
      expect(e.sender).toBe(initiatorElementRef.nativeElement);
      expect(e.action).toBe(NodeMenuAction.Close);
      done();
    });

    nodeMenuService.hideMenuForAllNodesExcept(initiatorElementRef);
  });
});
