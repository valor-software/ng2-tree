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
    //13 - enter
    //27 - esc
    if ($event.keyCode === 13) {
      // http://stackoverflow.com/questions/35515254/what-is-a-dehydrated-detector-and-how-am-i-using-one-here
      setTimeout(() => this.valueChanged.emit({value: newValue}), 1);
    }
  }

  @HostListener('blur', ['$event', '$event.target.value'])
  private editCompletedByMouse($event: any, newValue: any) {
    //13 - enter
    //27 - esc
    this.valueChanged.emit({value: newValue});
  }
}