import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { TreeService } from './tree.service';
import * as TreeTypes from './tree.types';

import { MenuItemSelectedEvent, NodeCheckedEvent, NodeEvent, NodeUncheckedEvent } from './tree.events';

import { Tree } from './tree';
import { TreeController } from './tree-controller';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tree',
  template: `<tree-internal #rootComponent [tree]="tree" [settings]="settings" [template]="template"></tree-internal>`,
  providers: [TreeService]
})
export class TreeComponent implements OnInit, OnChanges, OnDestroy {
  private static EMPTY_TREE: Tree = new Tree({ value: '' });

  /* tslint:disable:no-input-rename */
  @Input('tree') public treeModel: TreeTypes.TreeModel;
  /* tslint:enable:no-input-rename */

  @Input() public settings: TreeTypes.Ng2TreeSettings;

  @Output() public nodeCreated: EventEmitter<any> = new EventEmitter();

  @Output() public nodeRemoved: EventEmitter<any> = new EventEmitter();

  @Output() public nodeRenamed: EventEmitter<any> = new EventEmitter();

  @Output() public nodeSelected: EventEmitter<any> = new EventEmitter();

  @Output() public nodeUnselected: EventEmitter<any> = new EventEmitter();

  @Output() public nodeMoved: EventEmitter<any> = new EventEmitter();

  @Output() public nodeExpanded: EventEmitter<any> = new EventEmitter();

  @Output() public nodeCollapsed: EventEmitter<any> = new EventEmitter();

  @Output() public loadNextLevel: EventEmitter<any> = new EventEmitter();

  @Output() public nodeChecked: EventEmitter<NodeCheckedEvent> = new EventEmitter();

  @Output() public nodeUnchecked: EventEmitter<NodeUncheckedEvent> = new EventEmitter();

  @Output() public menuItemSelected: EventEmitter<any> = new EventEmitter();

  public tree: Tree;

  @ViewChild('rootComponent') public rootComponent;

  @ContentChild(TemplateRef) public template;

  private subscriptions: Subscription[] = [];

  public constructor(@Inject(TreeService) private treeService: TreeService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.treeModel) {
      this.tree = TreeComponent.EMPTY_TREE;
    } else {
      this.tree = new Tree(this.treeModel);
    }
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.treeService.nodeRemoved$.subscribe((e: NodeEvent) => {
        this.nodeRemoved.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeRenamed$.subscribe((e: NodeEvent) => {
        this.nodeRenamed.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeCreated$.subscribe((e: NodeEvent) => {
        this.nodeCreated.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeSelected$.subscribe((e: NodeEvent) => {
        this.nodeSelected.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeUnselected$.subscribe((e: NodeEvent) => {
        this.nodeUnselected.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeMoved$.subscribe((e: NodeEvent) => {
        this.nodeMoved.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeExpanded$.subscribe((e: NodeEvent) => {
        this.nodeExpanded.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeCollapsed$.subscribe((e: NodeEvent) => {
        this.nodeCollapsed.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.menuItemSelected$.subscribe((e: MenuItemSelectedEvent) => {
        this.menuItemSelected.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.loadNextLevel$.subscribe((e: NodeEvent) => {
        this.loadNextLevel.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeChecked$.subscribe((e: NodeCheckedEvent) => {
        this.nodeChecked.emit(e);
      })
    );

    this.subscriptions.push(
      this.treeService.nodeUnchecked$.subscribe((e: NodeUncheckedEvent) => {
        this.nodeUnchecked.emit(e);
      })
    );
  }

  public getController(): TreeController {
    return this.rootComponent.controller;
  }

  public getControllerByNodeId(id: number | string): TreeController {
    return this.treeService.getController(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
  }
}
