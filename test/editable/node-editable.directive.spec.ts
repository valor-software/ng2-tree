import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter } from '@angular/core';
import { NodeEditableDirective } from '../../src/editable/node-editable.directive';
import { NodeEditableEvent, NodeEditableEventAction } from '../../src/editable/editable.events';
import { TreeModel } from '../../src/tree.types';

let fixture;
let directiveEl;
let directiveInstance;

@Component({
  template: '<div id="editableTarget" [nodeEditable]="tree.value"></div>'
})
class TestComponent {
  public tree: TreeModel = {
    value: '42'
  };
}

describe('NodeEditableDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NodeEditableDirective, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    directiveEl = fixture.debugElement.query(By.directive(NodeEditableDirective));
    directiveInstance = directiveEl.injector.get(NodeEditableDirective);
  });

  it('should have correctly set "nodeValue" property', () => {
    fixture.detectChanges();

    expect(directiveInstance).not.toBeNull();
    expect(directiveInstance.nodeValue).toEqual('42');
  });

  it('should have correctly set "valueChanged" event emitter', () => {
    expect(directiveInstance.valueChanged instanceof EventEmitter).toBe(true);
  });

  it('should set focus on the host element', () => {
    spyOn(directiveEl.nativeElement, 'focus');

    fixture.detectChanges();

    expect(directiveEl.nativeElement.focus).toHaveBeenCalledTimes(1);
  });

  it('should set value the host element', () => {
    fixture.detectChanges();

    expect(directiveEl.nativeElement.value).toEqual('42');
  });

  it('should apply new value once user pressed enter', () => {
    fixture.detectChanges();

    const expectedNewValue = '12';
    const event = { target: { value: expectedNewValue } };

    spyOn(directiveInstance.valueChanged, 'emit');
    directiveEl.triggerEventHandler('keyup.enter', event);

    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledWith({ type: 'keyup', value: expectedNewValue });
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledTimes(1);
  });

  it('should apply new value once element under edit looses focus', () => {
    fixture.detectChanges();

    const expectedNewValue = '12';
    const event = { target: { value: expectedNewValue } };

    spyOn(directiveInstance.valueChanged, 'emit');
    directiveEl.triggerEventHandler('blur', event);

    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledWith({ type: 'blur', value: expectedNewValue });
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledTimes(1);
  });

  it('should cancel editing once escape was pressed during edit', () => {
    fixture.detectChanges();

    spyOn(directiveInstance.valueChanged, 'emit');
    directiveEl.triggerEventHandler('keyup.esc');

    const event: NodeEditableEvent = {
      type: 'keyup',
      value: directiveInstance.nodeValue,
      action: NodeEditableEventAction.Cancel
    };
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledWith(event);
    expect(directiveInstance.valueChanged.emit).toHaveBeenCalledTimes(1);
  });
});
