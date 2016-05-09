import {Directive, ElementRef, Input} from "@angular/core";
import {TreeService} from "./tree.service";
import {TreeModel} from "./types";

@Directive({
  selector: '[nodeDraggable]'
})
export default class NodeDraggableDirective {
  @Input()
  private nodeDraggable: ElementRef;

  @Input()
  private tree: TreeModel;

  private nativeElement: HTMLElement;

  constructor(private element: ElementRef, private treeService: TreeService) {
    this.nativeElement = element.nativeElement;
    this.nativeElement.draggable = true;

    this.nativeElement.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.nativeElement.addEventListener('dragenter', this.handleDragEnter.bind(this));
    this.nativeElement.addEventListener('dragover', this.handleDragOver.bind(this));
    this.nativeElement.addEventListener('dragleave', this.handleDragLeave.bind(this));
    this.nativeElement.addEventListener('drop', this.handleDrop.bind(this));
    this.nativeElement.addEventListener('dragend', this.handleDragEnd.bind(this));
  }

  private handleDragStart(e: any) {
    e.stopPropagation();
    e.dataTransfer.setData('text', 'firefox enables dragNdrop only when dataTransfer has data');

    this.treeService.sourceElement = {element: this.nodeDraggable, tree: this.tree};
    e.dataTransfer.effectAllowed = 'move';
  }

  private handleDragOver(e: any) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  private handleDragEnter(e: any) {
    e.preventDefault();

    e = e.originalEvent || e;
    var elementUnderCursor = document.elementFromPoint(e.pageX, e.pageY);
    if (this.nativeElement.contains(elementUnderCursor)) {
      this.nativeElement.classList.add('over-drop-target');
    }
  }

  private handleDragLeave(e: any) {
    // if (!e.target.draggable) return;

    e = e.originalEvent || e;
    var elementUnderCursor = document.elementFromPoint(e.pageX, e.pageY);
    if (!this.nativeElement.contains(elementUnderCursor)) {
      this.nativeElement.classList.remove('over-drop-target');
    }
  }

  private handleDrop(e: any) {
    this.nativeElement.classList.remove('over-drop-target');

    e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    e = e.originalEvent || e;
    var elementUnderCursor = document.elementFromPoint(e.pageX, e.pageY);
    if (!this.nativeElement.contains(elementUnderCursor)) {
      return false;
    }

    if (this.treeService.sourceElement.element === this.nodeDraggable) {
      return false;
    }

    if (this.treeService.sourceElement.element.nativeElement.contains(this.nodeDraggable.nativeElement)) {
      return false;
    }

    if (this.treeService.sourceElement) {
      this.treeService.emitDragNDropEvent({
        value: this.treeService.sourceElement.tree,
        source: this.treeService.sourceElement.element,
        target: this.nodeDraggable
      });
    }
  }

  private handleDragEnd(e: any) {
    this.treeService.sourceElement = null;
    this.nativeElement.classList.remove('over-drop-target');
  }
}
