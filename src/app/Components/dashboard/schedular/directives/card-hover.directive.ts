import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardHover]'
})
export class CardHoverDirective implements OnInit {
  card: any;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.card = this.el.nativeElement.querySelector('.comp');
    //console.log(this.card);
  }

  @HostListener('mouseover') onMouseOver() {
    this.card.style.boxShadow = '2px 2px 1px #999';
    this.card.style.top = '-2px';
  }

  @HostListener('mouseout') onMouseOut() {
    this.card.style.boxShadow = '';
    this.card.style.top = '';
  }



}
