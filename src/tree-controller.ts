import { TreeService } from './tree.service';
import { Tree } from './tree';
import { TreeModel } from './tree.types';
import { NodeMenuItemAction } from './menu/menu.events';
import { NodeEditableEvent, NodeEditableEventAction } from './editable/editable.events';
import { TreeInternalComponent } from './tree-internal.component';
import { Subject, Observable } from 'rxjs/Rx';
import { Injectable, Inject, ElementRef } from '@angular/core';

export class TreeController {
  private tree: Tree;

  constructor (private treeInternalComponent: TreeInternalComponent) {
    this.tree = this.treeInternalComponent.tree;
  }

  public select(e: MouseEvent = new MouseEvent('click')): void {
    if (!this.treeInternalComponent.isSelected && typeof this.treeInternalComponent.onNodeSelected === 'function') {
      this.treeInternalComponent.onNodeSelected(e);
    }
  }

  public isSelected(): boolean {
    return this.treeInternalComponent.isSelected;
  }

  public expand(): void {
    if (this.tree && !this.tree.isNodeExpanded()) {
      this.treeInternalComponent.onSwitchFoldingType();
    }
  }

  public isExpanded(): boolean {
    if (this.tree) {
      return this.tree.isNodeExpanded();
    }
  }

  public collapse(): void {
    if (this.tree.isNodeExpanded()) {
      this.treeInternalComponent.onSwitchFoldingType();
    }
  }

  public isCollapsed(): boolean {
    if (this.tree) {
      return this.tree.isNodeCollapsed();
    }
  }

  public rename(newValue: string): void {
    if (this.tree) {
      this.tree.markAsBeingRenamed();
      const nodeEditableEvent: NodeEditableEvent = {type: 'keyup', value: newValue};
      this.treeInternalComponent.applyNewValue(nodeEditableEvent);
    }
  }

  public remove(): void {
    if (typeof this.treeInternalComponent.onMenuItemSelected === 'function') {
      this.treeInternalComponent.onMenuItemSelected({ nodeMenuItemAction: NodeMenuItemAction.Remove });
    }
  }

  public addChild(newNode: TreeModel): void {
    if (this.tree) {
      const newTree = this.tree.createNode(Boolean(newNode.children), newNode);
      this.treeInternalComponent.treeService.fireNodeCreated(newTree, null);
    }
  }

  public changeNodeId(id: string | number) {
    if (!id || this.treeInternalComponent.treeService.getController(id)) {
     return;
    }

    if (this.tree) {
      this.treeInternalComponent.treeService.deleteController(this.tree.node.id);
      this.tree.node.id = id;
    }
    this.treeInternalComponent.treeService.setController(id, this);
  }

  public reloadChildren(): void {
    if (this.tree) {
      this.tree.reloadChildren();
    }
  }

  public setChildren(children: Array<TreeModel>): void {
    if (this.tree && !this.tree.isLeaf()) {
      this.tree.setChildren(children);
    }
  }
}
