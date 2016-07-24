import {TreeModel} from '../tree.types';
import {ElementRef} from '@angular/core';

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
