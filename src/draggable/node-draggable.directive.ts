import {Directive, ElementRef, Input, Inject, Renderer, OnDestroy} from '@angular/core';
import {TreeModel} from '../tree.types';
import {NodeDraggableService} from './node-draggable.service';
import {CapturedNode} from './captured-node';
import {NodeDraggableEvent} from './draggable.types';

@Directive({
  selector: '[nodeDraggable]'
})
export class NodeDraggableDirective implements OnDestroy {
  private static DATA_TRANSFER_STUB_DATA: string = 'some browsers enable drag-n-drop only when dataTransfer has data';

  @Input()
  private nodeDraggable: ElementRef;

  @Input()
  private tree: TreeModel;

  private nodeNativeElement: HTMLElement;
  private disposersForDragListeners: Function[] = [];

  constructor(
    @Inject(ElementRef) private element: ElementRef,
    @Inject(NodeDraggableService) private nodeDraggableService: NodeDraggableService,
    @Inject(Renderer) private renderer: Renderer) {

    this.nodeNativeElement = element.nativeElement;

    renderer.setElementAttribute(this.nodeNativeElement, 'draggable', 'true');

    this.disposersForDragListeners.push(renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this)));
    this.disposersForDragListeners.push(renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this)));
    this.disposersForDragListeners.push(renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this)));
    this.disposersForDragListeners.push(renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this)));
    this.disposersForDragListeners.push(renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this)));
    this.disposersForDragListeners.push(renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this)));
  }

  private handleDragStart(e: DragEvent): any {
    e.stopPropagation();

    this.nodeDraggableService.captureNode(new CapturedNode(this.nodeDraggable, this.tree));

    e.dataTransfer.setData('text', NodeDraggableDirective.DATA_TRANSFER_STUB_DATA);
    e.dataTransfer.effectAllowed = 'move';
  }

  private handleDragOver(e: DragEvent): any {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  private handleDragEnter(e: DragEvent): any {
    e.preventDefault();
    if (this.containsElementAt(e)) {
      this.addClass('over-drop-target');
    }
  }

  private handleDragLeave(e: DragEvent): any {
    if (!this.containsElementAt(e)) {
      this.removeClass('over-drop-target');
    }
  }

  private handleDrop(e: DragEvent): any {
    e.preventDefault();
    e.stopPropagation();

    this.removeClass('over-drop-target');

    if (!this.isDropPossible(e)) {
      return false;
    }

    if (this.nodeDraggableService.getCapturedNode()) {
      return this.notifyThatNodeWasDropped()
    }
  }

  private isDropPossible(e: DragEvent) {
    const capturedNode = this.nodeDraggableService.getCapturedNode();
    return capturedNode
      && capturedNode.canBeDroppedAt(this.nodeDraggable)
      && this.containsElementAt(e);
  }

  private handleDragEnd(e: DragEvent): any {
    this.removeClass('over-drop-target');
    this.nodeDraggableService.releaseCapturedNode();
  }

  private containsElementAt(e: DragEvent): boolean {
    const {x = e.clientX, y = e.clientY} = e;
    return this.nodeNativeElement.contains(document.elementFromPoint(x, y));
  }

  private addClass(className: string): void {
    const classList: DOMTokenList = this.nodeNativeElement.classList;
    classList.add(className);
  }

  private removeClass(className: string): void {
    const classList: DOMTokenList = this.nodeNativeElement.classList;
    classList.remove(className);
  }

  private notifyThatNodeWasDropped(): void {
    const event: NodeDraggableEvent = {
      captured: this.nodeDraggableService.getCapturedNode(),
      target: this.nodeDraggable
    };

    this.nodeDraggableService.draggableNodeEvents$.next(event);
  }

  ngOnDestroy(): void {
    this.disposersForDragListeners.forEach(dispose => dispose());
  }
}
