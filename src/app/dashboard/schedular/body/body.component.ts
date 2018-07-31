import { Component, OnInit } from '@angular/core';
import { LocalDate, LocalTime } from 'js-joda';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  labels: any[] = [];
  room_labels: any[] = [];
  rooms: any[] = [
    { name: 'Room 1', short_name: 'RM1', isFree: false, transaction_type: 1, from: '2018-08-03', to: '2018-08-05' },
    { name: 'Room 2', short_name: 'RM2', isFree: false, transaction_type: 1, from: '2018-08-01', to: '2018-08-01' },
    { name: 'Room 3', short_name: 'RM3', isFree: false, transaction_type: 2, from: '2018-08-01', to: '2018-08-03' },
    { name: 'Room 4', short_name: 'RM4', isFree: false, transaction_type: 1, from: '2018-08-06', to: '2018-08-07' },
    { name: 'Room 5', short_name: 'RM5', isFree: false, transaction_type: 2, from: '2018-07-31', to: '2018-07-31' },
    { name: 'Room 6', short_name: 'RM6', isFree: false, transaction_type: 1, from: '2018-08-07', to: '2018-08-07' },
    { name: 'Room 7', short_name: 'RM7', isFree: false, transaction_type: 0, from: '2018-08-02', to: '2018-08-03' },
    { name: 'Room 8', short_name: 'RM8', isFree: false, transaction_type: 0, from: '2018-08-04', to: '2018-08-05' },
    { name: 'Room 9', short_name: 'RM9', isFree: false, transaction_type: 1, from: '2018-08-03', to: '2018-08-03' },
    { name: 'Room 10', short_name: 'RM10', isFree: false, transaction_type: 1, from: '2018-08-01', to: '2018-08-03' }
  ];
  date: any;
  totalDays: any;
  lengthOfMonth: any;
  totalNeededDays: any;
  startingDay: any;
  endingDay: any;
  expectedTotalDay: any;
  jodalLib = LocalDate.now();
  rowIndex = 0;

  constructor() {
    this.labels.push('+/-');
    this.labels.push('Rooms');
    this.date = LocalDate.now();
    this.lengthOfMonth = this.date.lengthOfMonth();
    this.totalNeededDays = 30;
    this.startingDay = this.date.dayOfMonth();
    this.endingDay = this.startingDay + this.totalNeededDays;


    this.rooms.forEach(room => {
      this.room_labels[this.rowIndex] = new Array();
      this.totalNeededDays = 30;

      this.room_labels[this.rowIndex].push('*');
      this.room_labels[this.rowIndex].push(room.short_name);



      if (this.endingDay > this.lengthOfMonth) {
        let newEndingDay = this.endingDay - this.lengthOfMonth;

        for (let i = this.startingDay + 1; i <= this.lengthOfMonth; i++) {
          let year = this.jodalLib.year();
          let month = this.jodalLib.monthValue();
          let monthName = this.jodalLib.month();
          let fulldate = `${year}-${month}-${i}`;
          let parseDate = this.jodalLib.plusDays(i);

          let strDate = this.checkBooking(room.to, room.from, parseDate.toString());
          // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          this.room_labels[this.rowIndex].push(strDate);
          this.totalNeededDays = this.totalNeededDays - 1;
        }

        let localJodaLib = this.jodalLib.plusMonths(1);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          let year = localJodaLib.year();
          let month = localJodaLib.monthValue();
          let monthName = localJodaLib.month();
          let fulldate = `${year}-${month}-${i}`;
          let parseDate = localJodaLib.plusDays(i);
          let strDate = this.checkBooking(room.to, room.from, parseDate.toString());
          // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          this.room_labels[this.rowIndex].push(strDate);
        }


      } else {
        let localJodaLib = this.jodalLib.plusMonths(1);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          let year = localJodaLib.year();
          let month = localJodaLib.monthValue();
          let monthName = localJodaLib.month();
          let fulldate = `${year}-${month}-${i}`;
          let parseDate = localJodaLib.plusDays(i);

          // tslint:disable-next-line:max-line-length
          let strDate = this.checkBooking(room.to, room.from, parseDate.toString());  // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          this.room_labels[this.rowIndex].push(strDate);
        }
      }

      this.rowIndex += 1;




    });


  }

  ngOnInit() {
  }

  checkBooking(date2, date1, date3) {

    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let d3 = new Date(date3);
    let timeDiff = Math.abs(d2.getTime() - d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let currentDate = LocalDate.parse(date1);


    for (let i = 0; i <= diffDays; i++) {
      let dt = currentDate.plusDays(i);

      let d33 = LocalDate.parse(date3).minusMonths(1);

      if (d33.equals(dt)) {
        console.log(d33.toString(), dt.toString());
        return "*****";
      }

    }

    return "";



  }


}
