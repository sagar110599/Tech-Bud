import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cardHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(1.05);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(1.0);
  }

  private highlight(color: Number) {
    // this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transform = `scale(${color})`;
  }

}
