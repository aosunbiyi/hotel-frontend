import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDate } from 'js-joda';
import { ClarityIcons } from '@clr/icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-summary-bar',
  templateUrl: './summary-bar.component.html',
  styleUrls: ['./summary-bar.component.css']
})
export class SummaryBarComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDateChanged: EventEmitter<null> = new EventEmitter<null>();

  date = LocalDate.now();

  constructor() { }

  ngOnInit() {
  }

  changeDate(date) {
    this.onDateChanged.emit(date);
  }

}
