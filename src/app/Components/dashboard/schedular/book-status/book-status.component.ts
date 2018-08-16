import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-book-status',
  templateUrl: './book-status.component.html',
  styleUrls: ['./book-status.component.css']
})
export class BookStatusComponent implements OnInit {

  @ViewChild('comp', { read: ElementRef }) comp: ElementRef;

  @Input() label: String = '';

  bgColor: String = '';
  occupantName: String = '';
  transactionType: String = '';
  isRoom = false;
  isBookingMenu = false;
  isEmptyMenu = false;
  componentType: String = '';


  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.label !== '' && this.label.length > 0) {
      const list = this.label.split('-');


      this.occupantName = list[0];
      this.transactionType = list[1];
      this.componentType = list[2];

      if (this.transactionType === '0') {
        this.comp.nativeElement.classList.add('red');
      }

      if (this.transactionType === '1') {
        this.comp.nativeElement.classList.add('blue');
      }

      if (this.transactionType === '2') {
        this.comp.nativeElement.classList.add('green');
      }

    }
  }

  open() {

    console.log(this.componentType);
    if (this.componentType === 'room') {
      this.isRoom = true;
    }
    if (this.componentType === 'booking') {
      this.isBookingMenu = true;
    }
    if (this.componentType === '') {
      this.isEmptyMenu = true;
    }

  }

}
