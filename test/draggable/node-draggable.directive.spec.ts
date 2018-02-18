import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ElementRef } from '@angular/core';
import { NodeDraggableDirective } from '../../src/draggable/node-draggable.directive';
import { NodeDraggableService } from '../../src/draggable/node-draggable.service';
import { CapturedNode } from '../../src/draggable/captured-node';
import { NodeDraggableEvent } from '../../src/draggable/draggable.events';
import { Tree } from '../../src/tree';

let fixture;
let directiveEl;
let directiveInstance;
let nodeDraggableService;

@Component({
  template: '<div id="draggableTarget" [nodeDraggable]="draggableTarget" [tree]="tree"></div>'
})
class TestComponent {
  public tree: Tree = new Tree({
    value: '42'
  });

  public constructor(public draggableTarget: ElementRef) {}
}

describe('NodeDraggableDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodeDraggableDirective, TestComponent],
      providers: [NodeDraggableService]
    });

    fixture = TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(By.directive(NodeDraggableDirective));
    directiveInstance = directiveEl.injector.get(NodeDraggableDirective);
    nodeDraggableService = TestBed.get(NodeDraggableService);
  });

  it('should have correctly set "tree" property', () => {
    fixture.detectChanges();

    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.tree.value).toEqual('42');
  });

  it('should have correctly set "nodeDraggable" property', () => {
    fixture.detectChanges();

    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.nodeDraggable).toBe(fixture.componentInstance.draggableTarget);
  });

  it('should have correctly set "element" property', () => {
    fixture.detectChanges();

    const draggableElement = directiveEl.nativeElement;
    expect(directiveInstance.element.nativeElement).toBe(draggableElement);
  });

  it('should make host draggable', () => {
    fixture.detectChanges();

    const draggableElement = directiveEl.nativeElement;
    expect(draggableElement.draggable).toBe(true);
  });

  it('should add appropriate class on "dragenter"', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.x = 0;
    dragenterEvent.y = 0;

    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);

    directiveEl.triggerEventHandler('dragenter', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(0, 0);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.contains('over-drop-target')).toBe(true);
  });

  it('should not add appropriate class if "dragenter" was triggered on element which is not child or target element itself', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.x = 1;
    dragenterEvent.y = 2;

    spyOn(document, 'elementFromPoint').and.returnValue(null);

    directiveEl.triggerEventHandler('dragenter', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(directiveEl.nativeElement.classList.contains('over-drop-target')).toBe(false);
  });

  it('should use clientX, clientY properties on event if there are no x and y properties', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.clientX = 42;
    dragenterEvent.clientY = 12;

    spyOn(document, 'elementFromPoint');

    directiveEl.triggerEventHandler('dragenter', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.clientX, dragenterEvent.clientY);
  });

  it('should set dropEffect to "move" on dragover', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('event', ['preventDefault']);
    dragenterEvent.dataTransfer = {};

    directiveEl.triggerEventHandler('dragover', dragenterEvent);

    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.dataTransfer.dropEffect).toBe('move');
  });

  it('should captutre a node on dragstart', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation']);
    dragenterEvent.dataTransfer = jasmine.createSpyObj('dataTransfer', ['setData']);

    directiveEl.triggerEventHandler('dragstart', dragenterEvent);

    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);

    const capturedNode: CapturedNode = nodeDraggableService.getCapturedNode();
    expect(capturedNode.element).toBe(directiveInstance.nodeDraggable);
    expect(capturedNode.tree).toBe(directiveInstance.tree);

    expect(dragenterEvent.dataTransfer.setData).toHaveBeenCalledWith(
      'text',
      NodeDraggableDirective.DATA_TRANSFER_STUB_DATA
    );
    expect(dragenterEvent.dataTransfer.effectAllowed).toBe('move');
  });

  it('should remove "over-drop-target" class on dragleave if dragging left target element', () => {
    fixture.detectChanges();

    const dragenterEvent = { x: 1, y: 2 };

    spyOn(document, 'elementFromPoint').and.returnValue(null);

    const draggableElementClassList = directiveEl.nativeElement.classList;

    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);

    directiveEl.triggerEventHandler('dragleave', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(draggableElementClassList.contains('over-drop-target')).toBe(false);
  });

  it('should not remove "over-drop-target" dragging is happening on element', () => {
    fixture.detectChanges();

    const dragenterEvent = { x: 1, y: 2 };

    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);

    const draggableElementClassList = directiveEl.nativeElement.classList;

    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);

    directiveEl.triggerEventHandler('dragleave', dragenterEvent);

    expect(document.elementFromPoint).toHaveBeenCalledWith(dragenterEvent.x, dragenterEvent.y);
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);
  });

  it('should release captured node on "dragend" and get rid of "over-drop-target" class', () => {
    fixture.detectChanges();

    const draggableElementClassList = directiveEl.nativeElement.classList;
    draggableElementClassList.add('over-drop-target');
    expect(draggableElementClassList.contains('over-drop-target')).toBe(true);

    spyOn(nodeDraggableService, 'releaseCapturedNode');

    directiveEl.triggerEventHandler('dragend');

    expect(draggableElementClassList.contains('over-drop-target')).toBe(false);
    expect(nodeDraggableService.releaseCapturedNode).toHaveBeenCalled();
  });

  it('should handle drop event: prevent default action and stop event propagation', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');
    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(null);

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });

  it('should handle drop event: remove "over-drop-target" class', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');
    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(null);

    spyOn(directiveEl.nativeElement.classList, 'remove');

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(dragenterEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(dragenterEvent.preventDefault).toHaveBeenCalledTimes(1);

    expect(directiveEl.nativeElement.classList.remove).toHaveBeenCalledWith('over-drop-target');
    expect(directiveEl.nativeElement.classList.remove).toHaveBeenCalledTimes(1);

    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });

  it(`should handle drop event: do not notify that node was dropped if it is not a target's child element or target itself`, () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');

    const capturedNode = new CapturedNode(directiveInstance.nodeDraggable, directiveInstance.tree);
    spyOn(capturedNode, 'canBeDroppedAt').and.returnValue(true);

    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(capturedNode);
    spyOn(document, 'elementFromPoint').and.returnValue(null);

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(1);
    expect(nodeDraggableService.fireNodeDragged).not.toHaveBeenCalled();
  });

  it('should handle drop event: should notfy about successfully dropped node', () => {
    fixture.detectChanges();

    const dragenterEvent = jasmine.createSpyObj('e', ['stopPropagation', 'preventDefault']);

    spyOn(nodeDraggableService, 'fireNodeDragged');

    const capturedNode = new CapturedNode(directiveInstance.nodeDraggable, directiveInstance.tree);
    spyOn(capturedNode, 'canBeDroppedAt').and.returnValue(true);

    spyOn(nodeDraggableService, 'getCapturedNode').and.returnValue(capturedNode);
    spyOn(document, 'elementFromPoint').and.returnValue(directiveEl.nativeElement);

    directiveEl.triggerEventHandler('drop', dragenterEvent);

    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledWith(directiveInstance.nodeDraggable);
    expect(capturedNode.canBeDroppedAt).toHaveBeenCalledTimes(1);

    expect(nodeDraggableService.getCapturedNode).toHaveBeenCalledTimes(3);
    expect(nodeDraggableService.fireNodeDragged).toHaveBeenCalledTimes(1);

    const fireCapturedNode = nodeDraggableService.fireNodeDragged.calls.argsFor(0)[0];
    const fireTarget = nodeDraggableService.fireNodeDragged.calls.argsFor(0)[1];
    expect(fireCapturedNode).toBe(capturedNode);
    expect(fireTarget).toBe(directiveInstance.nodeDraggable);
  });

  it('TODO: should not make tree draggable if it is static', () => {});
});
