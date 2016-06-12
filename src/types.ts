import {ElementRef} from '@angular/core';

export enum FoldingType {
  Expanded,
  Collapsed,
  Leaf
}

export interface TreeEvent {
  node: TreeModel
}

export interface TreeModel {
  value: string;
  children?: Array<TreeModel>;
  status?: TreeStatus,
  foldingType?: FoldingType,
  indexInParent?: number
}

export enum TreeStatus {
  New,
  Modified,
  EditInProgress
}

export enum MouseButtons {
  Left = 1,
}

export enum NodeMenuItemAction {
  NewFolder,
  NewTag,
  Rename,
  Remove
}

export enum NodeMenuAction {
  Close
}

export interface NodeMenuEvent {
  sender: HTMLElement;
  action: NodeMenuAction;
}

export interface NodeMenuItemSelectedEvent {
  nodeMenuItemAction: NodeMenuItemAction
}

export type NodeEditableEventType = 'blur' | 'keyup';
export interface NodeEditableEvent {
  value: string,
  type: NodeEditableEventType
}

export enum NodeDraggableEventAction {
  Remove
}

export interface NodeDraggableEvent {
  captured: CapturedNode;
  target: ElementRef;
  action?: NodeDraggableEventAction;
}

export class CapturedNode {

  constructor(private anElement: ElementRef,
              private aTree: TreeModel) {
  }

  public canBeDroppedAt(element: ElementRef): boolean {
    return !this.sameAs(element) && !this.contains(element);
  }

  public contains(other: ElementRef): boolean {
    return this.element.nativeElement.contains(other.nativeElement)
  }

  public sameAs(other: ElementRef): boolean {
    return this.element === other;
  }

  get element(): ElementRef {
    return this.anElement;
  }

  get tree(): TreeModel {
    return this.aTree;
  }
}
