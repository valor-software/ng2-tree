import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[button]'
})
export class ButtonDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.classList.add('button');

    el.nativeElement.addEventListener('mousedown', e => {
      el.nativeElement.classList.add('button-pressed');
    });

    el.nativeElement.addEventListener('mouseup', e => {
      el.nativeElement.classList.remove('button-pressed');
    });
  }
}
