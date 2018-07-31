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
    this.labels.push('+/-');
    this.labels.push('Rooms');
    this.date = LocalDate.now();
    this.lengthOfMonth = this.date.lengthOfMonth();
    this.totalNeededDays = this.DAYS;
    this.startingDay = this.date.dayOfMonth();
    this.endingDay = this.startingDay + this.totalNeededDays;



    if (this.endingDay > this.lengthOfMonth) {
      let newEndingDay = this.endingDay - this.lengthOfMonth;

      for (let i = this.startingDay; i <= this.lengthOfMonth; i++) {
        let year = this.jodalLib.year();
        let month = this.jodalLib.monthValue();
        let monthName = this.jodalLib.month();
        let fulldate = `${year}-${month}-${i}`;
        let parseDate = this.jodalLib.plusDays(i);
        let strDate = `${monthName.toString().substr(0,3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0,3)}`;
        this.labels.push(strDate);
        this.totalNeededDays = this.totalNeededDays - 1;
      }

      let localJodaLib = this.jodalLib.plusMonths(1);
      for (let i = 1; i <= this.totalNeededDays; i++) {
        let year = localJodaLib.year();
        let month = localJodaLib.monthValue();
        let monthName = localJodaLib.month();
        let fulldate = `${year}-${month}-${i}`;
        let parseDate = localJodaLib.plusDays(i);
        let strDate = `${monthName.toString().substr(0,3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0,3)}`;
        this.labels.push(strDate);
      }


    } else {
      let localJodaLib = this.jodalLib.plusMonths(1);
      for (let i = 1; i <= this.totalNeededDays; i++) {
        let year = localJodaLib.year();
        let month = localJodaLib.monthValue();
        let monthName = localJodaLib.month();
        let fulldate = `${year}-${month}-${i}`;
        let parseDate = localJodaLib.plusDays(i);
        let strDate = `${monthName.toString().substr(0,3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0,3)}`;
        this.labels.push(strDate);
      }
    }




  }

  ngOnInit() {
  }

}
