import { Tree } from '../tree';
import { ElementRef } from '@angular/core';

export class CapturedNode {
  public constructor(private anElement: ElementRef, private aTree: Tree) {}

  public canBeDroppedAt(element: ElementRef): boolean {
    return !this.sameAs(element) && !this.contains(element);
  }

  public contains(other: ElementRef): boolean {
    return this.element.nativeElement.contains(other.nativeElement);
  }

  public sameAs(other: ElementRef): boolean {
    return this.element === other;
  }

  public get element(): ElementRef {
    return this.anElement;
  }

  public get tree(): Tree {
    return this.aTree;
  }
}
