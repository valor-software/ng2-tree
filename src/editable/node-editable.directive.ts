import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { NodeEditableEvent, NodeEditableEventAction } from './editable.events';

@Directive({
  selector: '[nodeEditable]'
})
export class NodeEditableDirective implements OnInit {
  /* tslint:disable:no-input-rename */
  @Input('nodeEditable') public nodeValue: string;
  /* tslint:enable:no-input-rename */

  @Output() public valueChanged: EventEmitter<NodeEditableEvent> = new EventEmitter<NodeEditableEvent>(false);

  public constructor(
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private elementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;

    if (nativeElement) {
      nativeElement.focus();
    }

    this.renderer.setProperty(nativeElement, 'value', this.nodeValue);
  }

  @HostListener('keyup.enter', ['$event.target.value'])
  public applyNewValue(newNodeValue: string): void {
    this.valueChanged.emit({ type: 'keyup', value: newNodeValue });
  }

  @HostListener('blur', ['$event.target.value'])
  public applyNewValueByLoosingFocus(newNodeValue: string): void {
    this.valueChanged.emit({ type: 'blur', value: newNodeValue });
  }

  @HostListener('keyup.esc')
  public cancelEditing(): void {
    this.valueChanged.emit({
      type: 'keyup',
      value: this.nodeValue,
      action: NodeEditableEventAction.Cancel
    });
  }
}
