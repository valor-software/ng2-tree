import { TestBed } from '@angular/core/testing';
import { NodeMenuService } from '../../src/menu/node-menu.service';
import { Subject } from 'rxjs/Rx';

let nodeMenuService;

describe('NodeMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeMenuService]
    });

    nodeMenuService = TestBed.get(NodeMenuService);
  });

  it('should be created by angular', () => {
    expect(nodeMenuService).not.toBeNull();
    expect(nodeMenuService.nodeMenuEvents$ instanceof Subject).toBe(true);
  });
});
