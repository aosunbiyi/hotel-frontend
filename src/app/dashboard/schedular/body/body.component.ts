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
    // tslint:disable-next-line:max-line-length
    { name: 'Room 1', short_name: 'RM1', wing: 'Wing A', floor: 'Floor 1', oc: 'Fred', isFree: false, transaction_type: 1, from: '2018-08-01', to: '2018-08-05' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 2', short_name: 'RM2', wing: 'Wing B', floor: 'Floor 3', oc: 'Ben', isFree: false, transaction_type: 1, from: '2018-08-01', to: '2018-08-01' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 3', short_name: 'RM3', wing: 'Wing C', floor: 'Floor 2', oc: 'Micheal', isFree: false, transaction_type: 2, from: '2018-08-01', to: '2018-08-03' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 4', short_name: 'RM4', wing: 'Wing A', floor: 'Floor 1', oc: 'Ade', isFree: false, transaction_type: 1, from: '2018-08-06', to: '2018-08-07' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 5', short_name: 'RM5', wing: 'Wing C', floor: 'Floor 1', oc: 'Adebayo', isFree: false, transaction_type: 2, from: '2018-07-31', to: '2018-08-01' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 6', short_name: 'RM6', wing: 'Wing A', floor: 'Floor 4', oc: 'Will', isFree: false, transaction_type: 1, from: '2018-08-07', to: '2018-08-07' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 7', short_name: 'RM7', wing: 'Wing A', floor: 'Floor 1', oc: 'Smith', isFree: false, transaction_type: 0, from: '2018-08-01', to: '2018-08-03' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 8', short_name: 'RM8', wing: 'Wing C', floor: 'Floor 2', oc: 'Krang', isFree: false, transaction_type: 0, from: '2018-08-04', to: '2018-08-05' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 9', short_name: 'RM9', wing: 'Wing B', floor: 'Floor 2', oc: 'Blog', isFree: false, transaction_type: 1, from: '2018-08-03', to: '2018-08-03' },
    // tslint:disable-next-line:max-line-length
    { name: 'Room 10', short_name: 'RM10', wing: 'Wing B', floor: 'Floor 1', oc: 'Troy', isFree: false, transaction_type: 1, from: '2018-08-01', to: '2018-08-03' }
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
  DAYS = 30;

  constructor() {

    this.jodalLib = LocalDate.now();
    this.date = LocalDate.now();
    this.room_labels = [];
    this.generateBody();

  }

  ngOnInit() {
  }

  reSetDate(date) {
    this.date = LocalDate.parse(date);
    this.jodalLib = LocalDate.parse(date);
    this.room_labels = [];
    this.generateBody();
  }

  generateBody() {


    this.lengthOfMonth = this.date.lengthOfMonth();
    this.totalNeededDays = this.DAYS;
    this.startingDay = this.date.dayOfMonth();
    this.endingDay = this.startingDay + this.totalNeededDays;


    this.rooms.forEach(room => {
      this.room_labels[this.rowIndex] = new Array();
      this.totalNeededDays = this.DAYS;


      this.room_labels[this.rowIndex].push(room.name);



      if (this.endingDay > this.lengthOfMonth) {
        const newEndingDay = this.endingDay - this.lengthOfMonth;


        for (let i = this.startingDay; i <= this.lengthOfMonth; i++) {
          const parseDate = this.jodalLib.withDayOfMonth(i);
          const year = this.jodalLib.year();
          const month = this.jodalLib.monthValue();
          const monthName = this.jodalLib.month();
          const fulldate = `${year}-${month}-${i}`;


          const strDate = this.checkBooking(room.to, room.from, parseDate.toString(), room);
          // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // const rr = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // console.log(rr);
          this.room_labels[this.rowIndex].push(strDate);
          this.totalNeededDays = this.totalNeededDays - 1;
        }



        const localJodaLib = this.jodalLib.plusMonths(1);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;

          const strDate = this.checkBooking(room.to, room.from, parseDate.toString(), room);
          // const rr = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // console.log(rr);
          this.room_labels[this.rowIndex].push(strDate);
        }


      } else {
        const localJodaLib = this.jodalLib.plusMonths(0);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i );
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;


          const strDate = this.checkBooking(room.to, room.from, parseDate.toString(), room);
          // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          this.room_labels[this.rowIndex].push(strDate);
        }
      }

      this.rowIndex += 1;




    });


  }

  checkBooking(date2, date1, date3, room) {

    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const currentDate = LocalDate.parse(date1);


    for (let i = 0; i <= diffDays; i++) {
      const dt = currentDate.plusDays(i);
      const d33 = LocalDate.parse(date3).minusMonths(0);

      if (d33.equals(dt)) {
        return `${room.oc}-${room.transaction_type}-${room.wing}-${room.floor}`;
      }

    }

    return '';



  }


}
