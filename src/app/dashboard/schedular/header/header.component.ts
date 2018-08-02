import { Component, OnInit } from '@angular/core';
import { LocalDate, LocalTime } from 'js-joda';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  labels: any[] = [];
  date: any;
  totalDays: any;
  lengthOfMonth: any;
  totalNeededDays: any;
  startingDay: any;
  endingDay: any;
  expectedTotalDay: any;
  jodalLib = LocalDate.now();

  DAYS = 30;

  constructor() {
    this.jodalLib = LocalDate.now();
    this.date = LocalDate.now();
    this.labels = [];
    this.generateHeader();

  }

  reSetDate(date) {
    this.jodalLib = LocalDate.parse(date);
    this.date = LocalDate.parse(date);
    this.labels = [];
    this.generateHeader();
  }

  generateHeader() {
    this.labels.push('Rooms');
    this.lengthOfMonth = this.date.lengthOfMonth();
    this.totalNeededDays = this.DAYS;
    this.startingDay = this.date.dayOfMonth();
    this.endingDay = this.startingDay + this.totalNeededDays;


    if (this.endingDay > this.lengthOfMonth) {
      const newEndingDay = this.endingDay - this.lengthOfMonth;

      for (let i = this.startingDay; i <= this.lengthOfMonth; i++) {
        const year = this.jodalLib.year();
        const month = this.jodalLib.monthValue();
        const monthName = this.jodalLib.month();
        const fulldate = `${year}-${month}-${i}`;
        const parseDate = this.jodalLib.withDayOfMonth(i);
        const strDate = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
        this.labels.push(strDate);
        this.totalNeededDays = this.totalNeededDays - 1;
      }

      const localJodaLib = this.jodalLib.plusMonths(1);
      for (let i = 1; i <= this.totalNeededDays; i++) {
        const year = localJodaLib.year();
        const month = localJodaLib.monthValue();
        const monthName = localJodaLib.month();
        const fulldate = `${year}-${month}-${i}`;
        const parseDate = localJodaLib.withDayOfMonth(i);
        const strDate = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
        this.labels.push(strDate);
      }


    } else {
      const localJodaLib = this.jodalLib.plusMonths(0);
      for (let i = 1; i <= this.totalNeededDays; i++) {
        const year = localJodaLib.year();
        const month = localJodaLib.monthValue();
        const monthName = localJodaLib.month();
        const fulldate = `${year}-${month}-${i}`;
        const parseDate = localJodaLib.withDayOfMonth(i);
        const strDate = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
        this.labels.push(strDate);
      }
    }

  }

  ngOnInit() {
  }

}
