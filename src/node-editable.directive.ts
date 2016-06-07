import {Directive, ElementRef, Input, OnInit, Output, EventEmitter, HostListener, Inject, Renderer} from '@angular/core';
import {NodeEditableEvent} from './types';

@Directive({
  selector: '[nodeEditable]'
})
export class NodeEditableDirective implements OnInit {
  @Input('nodeEditable')
  private nodeValue: string;

  @Output()
  private valueChanged: EventEmitter<NodeEditableEvent> = new EventEmitter(false);

  constructor(
    @Inject(Renderer) private renderer: Renderer,
    @Inject(ElementRef) private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;
    this.renderer.invokeElementMethod(nativeElement, 'focus', []);
    this.renderer.setElementProperty(nativeElement, 'value', this.nodeValue);
  }

  @HostListener('keyup.enter', ['$event.target.value'])
  private applyNewValue(newNodeValue: string) {
    return this.valueChanged.emit({type: 'keyup', value: newNodeValue});
  }

  @HostListener('keyup.esc')
  private cancelEditing() {
    return this.valueChanged.emit({type: 'keyup', value: this.nodeValue});
  }

  @HostListener('blur')
  private cancelEditingByLoosingFocus() {
    this.valueChanged.emit({type: 'blur', value: this.nodeValue});
  }
}
