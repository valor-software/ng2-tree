import {Directive, ElementRef, Input, Inject, Renderer} from "@angular/core";
import {TreeService} from "./tree.service";
import {TreeModel, CapturedNode, NodeDraggableEvent} from "./types";

@Directive({
  selector: '[nodeDraggable]'
})
export default class NodeDraggableDirective {
  @Input()
  private nodeDraggable: ElementRef;

  @Input()
  private tree: TreeModel;

  private nodeNativeElement: HTMLElement;

  constructor(
    @Inject(ElementRef) private element: ElementRef,
    @Inject(TreeService) private treeService: TreeService,
    @Inject(Renderer) private renderer: Renderer) {

    this.nodeNativeElement = element.nativeElement;

    renderer.setElementAttribute(this.nodeNativeElement, 'draggable', 'true');

    renderer.listen(this.nodeNativeElement, 'dragstart', this.handleDragStart.bind(this));
    renderer.listen(this.nodeNativeElement, 'dragenter', this.handleDragEnter.bind(this));
    renderer.listen(this.nodeNativeElement, 'dragover', this.handleDragOver.bind(this));
    renderer.listen(this.nodeNativeElement, 'dragleave', this.handleDragLeave.bind(this));
    renderer.listen(this.nodeNativeElement, 'drop', this.handleDrop.bind(this));
    renderer.listen(this.nodeNativeElement, 'dragend', this.handleDragEnd.bind(this));
  }

  private handleDragStart(e: DragEvent): any {
    e.stopPropagation();

    this.treeService.captureNode(new CapturedNode(this.nodeDraggable, this.tree));

    e.dataTransfer.setData('text', 'some browsers enable drag-n-drop only when dataTransfer has data');
    e.dataTransfer.effectAllowed = 'move';
  }

  private handleDragOver(e: DragEvent): any {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  private handleDragEnter(e: DragEvent): any {
    e.preventDefault();
    if (this.containsElementAt(e.pageX, e.pageY)) {
      this.addClass('over-drop-target');
    }
  }

  private handleDragLeave(e: DragEvent): any {
    if (!this.containsElementAt(e.pageX, e.pageY)) {
      this.removeClass('over-drop-target');
    }
  }

  private handleDrop(e: DragEvent): any {
    e.preventDefault();
    e.stopPropagation();

    this.removeClass('over-drop-target');

    const capturedNode = this.treeService.getCapturedNode();
    if (!this.containsElementAt(e.pageX, e.pageY)
      || !capturedNode.canBeDroppedAt(this.nodeDraggable)) {
      return false;
    }

    if (this.treeService.getCapturedNode()) {
      return this.notifyThatNodeWasDropped()
    }
  }

  private handleDragEnd(e: DragEvent): any {
    this.removeClass('over-drop-target');
    this.treeService.releaseCapturedNode();
  }

  private containsElementAt(x: number, y: number): boolean {
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
      captured: this.treeService.getCapturedNode(),
      target: this.nodeDraggable
    };

    this.treeService.draggableNodeEvents$.next(event);
  }
}
