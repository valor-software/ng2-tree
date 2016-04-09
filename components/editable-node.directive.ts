import {Directive, ElementRef, Input, OnInit, Output, EventEmitter, HostListener} from 'angular2/core';
import {Ng2TreeService} from './ng2-tree.service';

@Directive({
  selector: '[editable]'
})
export class EditableNodeDirective implements OnInit {
  @Input()
  nodeValue: string;

  @Output()
  valueChanged: EventEmitter<any> = new EventEmitter(false);

  private element: any;
  private treeService: Ng2TreeService;

  constructor(elementRef: ElementRef, treeService: Ng2TreeService) {
    this.element = elementRef;
    this.treeService = treeService;
  }

  ngOnInit(): void {
    this.element.nativeElement.focus();
    this.element.nativeElement.value = this.nodeValue;
  }

  @HostListener('keyup', ['$event', '$event.target.value'])
  private editCompleted($event: any, newValue: any) {
    if ($event.keyCode === 13) {//enter
      return this.valueChanged.emit({type: 'keyup', value: newValue});
    }

    if ($event.keyCode === 27) {//esc
      return this.valueChanged.emit({type: 'keyup', value: this.nodeValue});
    }
  }

  @HostListener('blur', ['$event', '$event.target.value'])
  private editCompletedByMouse($event: any, newValue: any) {
    this.valueChanged.emit({type: 'blur', value: this.nodeValue});
  }
}