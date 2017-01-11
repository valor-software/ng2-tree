import { TestBed } from '@angular/core/testing';
import { TreeService } from '../src/tree.service';
import { Subject } from 'rxjs/Rx';

let treeService;

describe('TreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeService]
    });

    treeService = TestBed.get(TreeService);
  });

  it('should be created by angular', () => {
    expect(treeService).not.toBeNull();
    expect(treeService.nodeMoved$ instanceof Subject).toBe(true);
    expect(treeService.nodeRemoved$ instanceof Subject).toBe(true);
    expect(treeService.nodeRenamed$ instanceof Subject).toBe(true);
    expect(treeService.nodeCreated$ instanceof Subject).toBe(true);
    expect(treeService.nodeSelected$ instanceof Subject).toBe(true);
  });
});
