import { SafeHtmlPipe } from '../../src/utils/safe-html.pipe';
import { PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

let sanitizerSpy;
let safeHtmlPipe: PipeTransform;

describe('SafeHtmlPipe', () => {
  beforeEach(() => {
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    safeHtmlPipe = new SafeHtmlPipe(sanitizerSpy);
  });

  it('should transform html to the SafeHtml', () => {
    const html = '<a href="#">foo</a>';
    const sanitized = '<a href="#">sanitized</a>';

    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue(sanitized);

    const safeHtml: SafeHtml = safeHtmlPipe.transform(html);

    expect(safeHtml).toEqual(sanitized);

    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith(html);
  });
});
