import {ElementRef} from '@angular/core';
export interface TreeModel {
  value: string;
  children?: Array<TreeModel>;
  status?: TreeStatus
}

export enum TreeStatus {
  New,
  Modified
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

export interface NodeMenuItemSelectedEvent {
  nodeMenuItemAction: NodeMenuItemAction
}

export interface NodeEditableEvent {
  value: any,
  type: string
}

export interface NodeDraggableEvent {
  captured: CapturedNode;
  target: ElementRef;
  action?: string;
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
