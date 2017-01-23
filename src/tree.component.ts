import { Input, Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { TreeService } from './tree.service';
import { TreeModel, TreeViewOptions, NodeEvent, Tree } from './tree.types';

@Component({
  selector: 'tree',
  template: `<tree-internal [tree]="tree" [options]="options"></tree-internal>`,
  providers: [TreeService]
})
export class TreeComponent implements OnInit {
  /* tslint:disable:no-input-rename */
  @Input('tree')
  public treeModel: TreeModel;
  /* tslint:enable:no-input-rename */

  @Input()
  public options: TreeViewOptions;

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

  public tree: Tree;

  public constructor(@Inject(TreeService) private treeService: TreeService) {
  }

  public ngOnInit(): void {
    this.tree = Tree.buildTreeFromModel(this.treeModel);

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
