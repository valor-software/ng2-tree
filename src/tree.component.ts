import { Input, Component, OnInit, EventEmitter, Output, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { TreeService } from './tree.service';
import * as TreeTypes from './tree.types';
import { NodeEvent } from './tree.events';
import { Tree } from './tree';

@Component({
  selector: 'tree',
  template: `<tree-internal [tree]="tree" [settings]="settings"></tree-internal>`,
  providers: [TreeService]
})
export class TreeComponent implements OnInit, OnChanges {
  private static EMPTY_TREE: Tree = new Tree({value: ''});

  /* tslint:disable:no-input-rename */
  @Input('tree')
  public treeModel: TreeTypes.TreeModel;
  /* tslint:enable:no-input-rename */

  @Input()
  public settings: TreeTypes.Ng2TreeSettings;

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

  @Output()
  public nodeExpanded: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeCollapsed: EventEmitter<any> = new EventEmitter();

  public tree: Tree;

  public constructor(@Inject(TreeService) private treeService: TreeService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.treeModel) {
      this.tree = TreeComponent.EMPTY_TREE;
    } else {
      this.tree = new Tree(this.treeModel);
    }
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

    this.treeService.nodeExpanded$.subscribe((e: NodeEvent) => {
      this.nodeExpanded.emit(e);
    });

    this.treeService.nodeCollapsed$.subscribe((e: NodeEvent) => {
      this.nodeCollapsed.emit(e);
    });
  }
}
