import { Input, Component, OnInit, EventEmitter, Output, ElementRef, Inject } from '@angular/core';
import { TreeService } from './tree.service';
import { TreeModel, TreeViewOptions, NodeEvent } from './tree.types';

@Component({
  selector: 'tree',
  template: `<tree-internal [tree]="tree" [viewOptions]="viewOptions"></tree-internal>`,
  providers: [TreeService]
})
export class TreeComponent implements OnInit {
  @Input()
  public tree: TreeModel;

  @Input()
  public viewOptions: TreeViewOptions;

  @Output()
  public nodeCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeRenamed: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeMoved: EventEmitter<any> = new EventEmitter();

  public constructor(@Inject(TreeService) private treeService: TreeService) {
  }

  public ngOnInit(): void {
    this.treeService.nodeRemoved$.subscribe((e: NodeEvent) => {
      this.nodeRemoved.emit(e);
    });

    this.treeService.nodeRenamed$.subscribe((e: NodeEvent) => {
      this.nodeRenamed.emit(e);
    });

    this.treeService.nodeCreated$.subscribe((e: NodeEvent) => {
      this.nodeCreated.emit(e);
    });

    this.treeService.nodeSelected$.subscribe((e: NodeEvent) => {
      this.nodeSelected.emit(e);
    });

    this.treeService.nodeMoved$.subscribe((e: NodeEvent) => {
      this.nodeMoved.emit(e);
    });
  }
}
