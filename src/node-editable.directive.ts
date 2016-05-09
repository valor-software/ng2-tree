import {Directive, ElementRef, Input, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import {TreeService} from './tree.service';

@Directive({
  selector: '[nodeEditable]'
})
export class NodeEditableDirective implements OnInit {
  @Input()
  private nodeEditable: string;

  @Output()
  private valueChanged: EventEmitter<any> = new EventEmitter(false);

  private element: any;
  private treeService: TreeService;

  constructor(elementRef: ElementRef, treeService: TreeService) {
    this.element = elementRef;
    this.treeService = treeService;
  }

  ngOnInit(): void {
    this.element.nativeElement.focus();
    this.element.nativeElement.value = this.nodeEditable;
  }

  @HostListener('keyup', ['$event', '$event.target.value'])
  private editCompleted($event: any, newValue: any) {
    if ($event.keyCode === 13) {//enter
      return this.valueChanged.emit({type: 'keyup', value: newValue});
    }

    if ($event.keyCode === 27) {//esc
      return this.valueChanged.emit({type: 'keyup', value: this.nodeEditable});
    }
  }

  @HostListener('blur', ['$event', '$event.target.value'])
  private editCompletedByMouse($event: any, newValue: any) {
    this.valueChanged.emit({type: 'blur', value: this.nodeEditable});
  }
}
