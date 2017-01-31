import { Input, Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Inject } from '@angular/core';
import { TreeStatus, TreeModel, FoldingType, NodeEvent, RenamableNode, NodeSelectedEvent } from './tree.types';
import { TreeModelOptions, TreeOptions, MenuOptions } from './options.types';
import { NodeDraggableService } from './draggable/node-draggable.service';
import { NodeMenuService } from './menu/node-menu.service';
import { NodeDraggableEventAction, NodeDraggableEvent } from './draggable/draggable.types';
import { MenuEvent, MenuAction, MenuItemSelectedEvent, MenuItemAction } from './menu/menu.types';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.type';
import { TreeService } from './tree.service';
import { isLeftButtonClicked, isRightButtonClicked } from './utils/event.utils';
import * as _ from 'lodash';
import { applyNewValueToRenamable, isRenamable, isValueEmpty } from './utils/type.utils';

@Component({
  selector: 'tree-internal',
  template: `
  <ul class="tree" *ngIf="tree">
    <li>
      <div class="node-container" (contextmenu)="showRightMenu($event)" [nodeDraggable]="element" [tree]="tree">
        <div class="folding" (click)="switchFoldingType($event, tree)" [ngClass]="getFoldingTypeCssClass(tree)"></div>
        <div href="#" class="node-value"
              *ngIf="!isEditInProgress()"
              [class.node-selected]="isSelected"
              (click)="onNodeSelected($event, tree)"
              (dblclick)="onNodeDoubleClicked($event, tree)">
          <i [ngClass]="getNodeIconCssClass(tree)"></i>
          {{tree.value}}
        </div>

        <input type="text" class="node-value" *ngIf="isEditInProgress()"
              [nodeEditable]="tree.value"
              (valueChanged)="applyNewValue($event, tree)"/>

        <div #leftMenuButton [ngClass]="getLeftMenuCssClass()" *ngIf="tree.options.leftMenu" (click)="showLeftMenu($event)"></div>
        <node-menu [type]="'left'" *ngIf="isLeftMenuVisible && tree.options.leftMenu" (menuItemSelected)="onMenuItemSelected($event)" [menuOptions]="leftMenuOptions" [node]="tree"></node-menu>

      </div>

      <node-menu [type]="'right'" *ngIf="isRightMenuVisible" (menuItemSelected)="onMenuItemSelected($event)" [menuOptions]="rightMenuOptions" [node]="tree"></node-menu>

      <template [ngIf]="isNodeExpanded()">
        <tree-internal [options]="options" *ngFor="let child of tree.children; let position = index"
              [parentTree]="tree"
              [indexInParent]="position"
              [tree]="child"
              (nodeRemoved)="onChildRemoved($event)"></tree-internal>
      </template>
    </li>
  </ul>
  `
})
export class TreeInternalComponent implements OnInit {
  @Input()
  public tree: TreeModel;

  @Input()
  public parentTree: TreeModel;

  @Input()
  public indexInParent: number;

  @Input()
  public options: TreeOptions;

  @Output()
  public nodeExpanded: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  @Output()
  public nodeCollapsed: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  @Output()
  public nodeRemoved: EventEmitter<NodeEvent> = new EventEmitter<NodeEvent>();

  @ViewChild('leftMenuButton') leftMenuButton: ElementRef;

  private isLeaf: boolean;
  private isSelected: boolean = false;
  private isRightMenuVisible: boolean = false;
  private isLeftMenuVisible: boolean = false;
  private leftMenuOptions: MenuOptions;
  private rightMenuOptions: MenuOptions;

  public constructor(@Inject(NodeMenuService) private nodeMenuService: NodeMenuService,
                     @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
                     @Inject(TreeService) private treeService: TreeService,
                     @Inject(ElementRef) private element: ElementRef) {
  }

  public ngOnInit(): void {
    this.indexInParent = 0;
    this.tree._indexInParent = this.indexInParent;

    this.isLeaf = !Array.isArray(this.tree.children);
    this.tree.options = TreeModelOptions.getOptions(this.tree, this.parentTree, this.options);

    this.isSelected = _.get(this.tree, 'options.selected', false);

    if (_.get(this.tree, 'options.rightMenu', true)) {
      this.isRightMenuVisible = false;
      this.rightMenuOptions = _.get(this.tree, 'options.rightMenuOptions', undefined);
      this.setUpRightMenuEventHandler();
    }

    if (_.get(this.tree, 'options.leftMenu', false)) {
      this.isLeftMenuVisible = false
      this.leftMenuOptions = _.get(this.tree, 'options.leftMenuOptions', undefined);
      this.setUpLeftMenuEventHandler();
    }

    this.setUpNodeSelectedEventHandler();
    this.setUpDraggableEventHandler();
  }

  private setUpNodeSelectedEventHandler(): void {
    this.treeService.nodeSelected$
      .filter((e: NodeSelectedEvent) => this.tree !== e.node)
      .subscribe(() => this.isSelected = false);
  }

  private setUpRightMenuEventHandler(): void {
    // Event handler for closing right menu click
    this.nodeMenuService.nodeMenuEvents$
      .filter((e: MenuEvent) => this.element.nativeElement !== e.sender)
      .filter((e: MenuEvent) => e.action === MenuAction.Close)
      .subscribe(() => {
        console.log('close right');
        this.isRightMenuVisible = false;
      });
  }

  private setUpLeftMenuEventHandler(): void {
    // Event handler for closing right menu click
    this.nodeMenuService.nodeMenuEvents$
      .filter((e: MenuEvent) => this.element.nativeElement !== e.sender)
      .filter((e: MenuEvent) => e.action === MenuAction.Close)
      .subscribe(() => {
        console.log('close left');
        this.isLeftMenuVisible = false;
        if (_.get(this, 'leftMenuButton.nativeElement.classList', undefined) !== undefined) {
          this.leftMenuButton.nativeElement.classList.remove('active');
        }
      });
  }

  // DRAG-N-DROP -------------------------------------------------------------------------------------------------------

  private setUpDraggableEventHandler(): void {
    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action === NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.captured.element === this.element)
      .subscribe((e: NodeDraggableEvent) => this.onChildRemoved({node: e.captured.tree}, this.parentTree));

    this.nodeDraggableService.draggableNodeEvents$
      .filter((e: NodeDraggableEvent) => e.action !== NodeDraggableEventAction.Remove)
      .filter((e: NodeDraggableEvent) => e.target === this.element)
      .filter((e: NodeDraggableEvent) => !this.hasChild(e.captured.tree))
      .subscribe((e: NodeDraggableEvent) => {
        if (this.isSiblingOf(e.captured.tree)) {
          return this.swapWithSibling(e.captured.tree);
        }

        if (this.isFolder()) {
          return this.moveNodeToThisTreeAndRemoveFromPreviousOne(e);
        } else {
          return this.moveNodeToParentTreeAndRemoveFromPreviousOne(e);
        }
      });
  }

  private moveNodeToThisTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent): void {
    this.tree.children.push(e.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));

    this.treeService.nodeMoved$.next({
      node: e.captured.tree,
      parent: this.tree
    });
  }

  private moveNodeToParentTreeAndRemoveFromPreviousOne(e: NodeDraggableEvent): void {
    this.parentTree.children.splice(this.indexInParent, 0, e.captured.tree);
    this.nodeDraggableService.draggableNodeEvents$.next(_.merge(e, {action: NodeDraggableEventAction.Remove}));

    this.treeService.nodeMoved$.next({
      node: e.captured.tree,
      parent: this.parentTree
    });
  }

  private isEditInProgress(): boolean {
    return this.tree._status === TreeStatus.EditInProgress
      || this.tree._status === TreeStatus.New;
  }

  private isFolder(): boolean {
    return !this.isLeaf;
  }

  private hasChild(child: TreeModel): boolean {
    return _.includes(this.tree.children, child);
  }

  private isSiblingOf(child: TreeModel): boolean {
    return this.parentTree && _.includes(this.parentTree.children, child);
  }

  private swapWithSibling(sibling: TreeModel): void {
    const siblingIndex = this.parentTree.children.indexOf(sibling);
    const thisTreeIndex = this.parentTree.children.indexOf(this.tree);

    this.parentTree.children[siblingIndex] = this.tree;
    this.parentTree.children[thisTreeIndex] = sibling;

    this.tree._indexInParent = siblingIndex;
    sibling._indexInParent = thisTreeIndex;

    this.treeService.nodeMoved$.next({
      node: this.tree,
      parent: this.parentTree
    });
  }

  // FOLDING -----------------------------------------------------------------------------------------------------------

  private isNodeExpanded(): boolean {
    return this.tree._foldingType === FoldingType.Expanded;
  }

  private switchFoldingType(e: any, tree: TreeModel): void {
    this.handleFoldingType(e.target.parentNode.parentNode, tree);
  }

  private getNodeIconCssClass(node: TreeModel): string {
    if (node._foldingType === FoldingType.Leaf) {
      return _.get(node, 'options.cssClasses.leafIcon', 'node-icon');
    }

    return _.get(node, 'options.cssClasses.nodeIcon', 'node-icon');
  }

  private getLeftMenuCssClass(): string {
    return _.get(this.tree, 'options.cssClasses.leftMenu', 'node-left-menu');
  }

  private getFoldingTypeCssClass(node: TreeModel): string {
    if (!node._foldingType) {
      if (node.children) {
        if (
          !_.get(node, 'options.expandEmptyNode', true)
          && (_.get(node, 'options.lazyLoading', false) && !_.get(node, 'hasNodeChildren', false))
          && node.children.length === 0
        ) {
          return '';
        }

        if (_.get(node, 'options.expanded') === false) {
          node._foldingType = FoldingType.Collapsed;
        } else {
          node._foldingType = FoldingType.Expanded;
        }
      } else {
        node._foldingType = FoldingType.Leaf;
      }
    }

    return node._foldingType.getCssClass(node.options);
  }

  private getNextFoldingType(node: TreeModel): FoldingType {
    if (node._foldingType === FoldingType.Expanded) {
      this.treeService.nodeCollapsed$.next({
        node: node
      });

      this.nodeCollapsed.emit({node: node});

      return FoldingType.Collapsed;
    }

    this.treeService.nodeExpanded$.next({
      node: node
    });

    this.nodeExpanded.emit({node: node});
    return FoldingType.Expanded;
  }

  private handleFoldingType(parent: TreeModel, node: TreeModel): void {
    if (node._foldingType === FoldingType.Leaf) {
      return;
    }

    node._foldingType = this.getNextFoldingType(node);
  }

  // MENU --------------------------------------------------------------------------------------------------------------

  private onMenuItemSelected(e: MenuItemSelectedEvent): void {
    switch (e.nodeMenuItemAction) {
      case MenuItemAction.NewLeaf:
        this.onNewSelected(e);
        break;
      case MenuItemAction.NewNode:
        this.onNewSelected(e);
        break;
      case MenuItemAction.Rename:
        this.onRenameSelected();
        break;
      case MenuItemAction.Remove:
        this.onRemoveSelected();
        break;
      default:
        if (typeof e.nodeMenuItemAction.action === 'function') {
          e.nodeMenuItemAction.action({node: this.tree, parent: this.parentTree});
        }
    }
  }

  private onRenameSelected(): void {
    this.tree._status = TreeStatus.EditInProgress;
    this.isRightMenuVisible = false;
  }

  private onRemoveSelected(): void {
    this.treeService.nodeRemoved$.next({
      node: this.tree,
      parent: this.parentTree
    });

    this.nodeRemoved.emit({node: this.tree});
  }

  private onNewSelected(e: MenuItemSelectedEvent): void {
    if (!this.tree.children || !this.tree.children.push) {
      this.tree.children = [];
    }
    const newNode: TreeModel = {value: '', _status: TreeStatus.New};

    if (e.nodeMenuItemAction === MenuItemAction.NewNode) {
      newNode.children = [];
    }

    this.isLeaf ? this.parentTree.children.push(newNode) : this.tree.children.push(newNode);
    this.isRightMenuVisible = false;
  }

  private onChildRemoved(e: NodeEvent, parent: TreeModel = this.tree): void {
    const childIndex = _.findIndex(parent.children, (child: any) => child === e.node);
    if (childIndex >= 0) {
      parent.children.splice(childIndex, 1);
    }
  }

  private showLeftMenu(e: MouseEvent): void {
    if (this.tree.options.static) {
      return;
    }

    if (isLeftButtonClicked(e) && _.get(this.tree, 'options.leftMenu', false)) {
      this.isLeftMenuVisible = !this.isLeftMenuVisible;
    }

    if (this.isLeftMenuVisible) {
      this.leftMenuButton.nativeElement.classList.add('active');
    }
  }

  private showRightMenu(e: MouseEvent): void {
    if (this.tree.options.static) {
      return;
    }

    if (isRightButtonClicked(e) && _.get(this.tree, 'options.rightMenu', true)) {
      this.isRightMenuVisible = !this.isRightMenuVisible;
      this.nodeMenuService.nodeMenuEvents$.next({
        sender: this.element.nativeElement,
        action: MenuAction.Close
      });
      e.preventDefault();
    }
  }

  private applyNewValue(e: NodeEditableEvent, node: TreeModel): void {
    if (e.action === NodeEditableEventAction.Cancel) {
      if (isValueEmpty(e.value)) {
        return this.nodeRemoved.emit({node: this.tree});
      }

      node._status = TreeStatus.Modified;
      return;
    }

    if (isValueEmpty(e.value)) {
      return;
    }

    const nodeOldValue = node.value;

    if (isRenamable(node.value)) {
      node.value = applyNewValueToRenamable(node.value as RenamableNode, e.value);
    } else {
      node.value = e.value;
    }

    if (node._status === TreeStatus.New) {
      this.treeService.nodeCreated$.next({node, parent: this.parentTree});
    }

    if (node._status === TreeStatus.EditInProgress) {
      this.treeService.nodeRenamed$.next({
        node,
        parent: this.parentTree,
        oldValue: nodeOldValue,
        newValue: node.value
      });
    }

    node._status = TreeStatus.Modified;
  }

  private onNodeSelected(e: MouseEvent, tree: TreeModel): void {
    if (isLeftButtonClicked(e)) {
      if (_.get(this, 'options.selectEvent', true)) {
        this.isSelected = true;
        this.treeService.nodeSelected$.next({node: this.tree});
      } else {
        this.switchFoldingType(e, tree)
      }
    }
  }

  private onNodeDoubleClicked(e: MouseEvent, tree: TreeModel): void {
    if (_.get(this, 'options.editOnDouleClick', false)) {
      this.onRenameSelected();
      this.treeService.nodeSelected$.next({node: tree});
    }
  }
}

@Component({
  selector: 'tree',
  template: `
  <menu *ngIf="hasMainMenu" [menuOptions]="mainMenuOptions" [rootNode]="tree"></menu>
  <tree-internal [tree]="tree" [options]="options"></tree-internal>
  `,
  providers: [TreeService]
})
export class TreeComponent implements OnInit {
  @Input()
  public tree: TreeModel;

  @Input()
  public options: TreeOptions;

  @Output()
  public nodeCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeRemoved: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeRenamed: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeSelected: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeExpanded: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeCollapsed: EventEmitter<any> = new EventEmitter();

  @Output()
  public nodeMoved: EventEmitter<any> = new EventEmitter();

  private mainMenuOptions: MenuOptions;
  private hasMainMenu: boolean = false;

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

    this.treeService.nodeExpanded$.subscribe((e: NodeEvent) => {
      this.nodeExpanded.emit(e);
    });

    this.treeService.nodeCollapsed$.subscribe((e: NodeEvent) => {
      this.nodeCollapsed.emit(e);
    });

    this.treeService.nodeMoved$.subscribe((e: NodeEvent) => {
      this.nodeMoved.emit(e);
    });

    this.hasMainMenu = _.get(this.options, 'mainMenu', false);
    this.tree.options = _.get(this.tree, 'options', this.options);
    this.mainMenuOptions = _.defaults(
      _.get(this.tree, 'options.mainMenuOptions', undefined),
      _.get(this.options, 'mainMenuOptions', undefined)
    );
  }

}
