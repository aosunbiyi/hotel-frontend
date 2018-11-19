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
    {
      name: 'Room 1', short_name: 'RM1',
      details: [

      ],
      bookings: [
        {
          transaction_type: 1, from: '2018-11-01', to: '2018-11-05', oc: 'Fred'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 2', short_name: 'RM2', bookings: [
        {
          transaction_type: 1, from: '2018-11-03', to: '2018-11-04', oc: 'G2'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      // tslint:disable-next-line:max-line-length
      name: 'Room 3', short_name: 'RM3', bookings: [
        {
          transaction_type: 1, from: '2018-11-03', to: '2018-11-03', oc: 'Samsung'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 4', short_name: 'RM4', bookings: [
        {
          transaction_type: 1, from: '2018-11-05', to: '2018-11-05', oc: 'KC'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      // tslint:disable-next-line:max-line-length
      name: 'Room 5', short_name: 'RM5', bookings: [
        {
          transaction_type: 1, from: '2018-11-02', to: '2018-11-04', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 6', short_name: 'RM6', bookings: [
        {
          transaction_type: 1, from: '2018-11-01', to: '2018-11-01', oc: 'Willi'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 7', short_name: 'RM7', bookings: [
        {
          transaction_type: 1, from: '2018-11-02', to: '2018-11-03', oc: 'Dada'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 8', short_name: 'RM8', bookings: [
        {
          transaction_type: 1, from: '2018-11-02', to: '2018-11-03', oc: 'Yemi'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 9', short_name: 'RM9', bookings: [
        {
          transaction_type: 1, from: '2018-11-05', to: '2018-11-05', oc: 'Kingson'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-11-26', to: '2018-11-27', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-11-28', to: '2018-11-30', oc: 'Unknown'
        }
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      name: 'Room 10', short_name: 'RM10', bookings: [
        {
          transaction_type: 1, from: '2018-11-03', to: '2018-11-03', oc: 'Benson'
        },
        {
          transaction_type: 1, from: '2018-11-07', to: '2018-11-11', oc: 'Ben'
        },
        {
          transaction_type: 1, from: '2018-11-12', to: '2018-11-15', oc: 'Mr King'
        },
        {
          transaction_type: 1, from: '2018-11-20', to: '2018-11-20', oc: 'Allen'
        },
        {
          transaction_type: 1, from: '2018-11-22', to: '2018-11-25', oc: 'Greg'
        },
        {
          transaction_type: 1, from: '2018-09-04', to: '2018-09-8', oc: 'Prince'
        },
        {
          transaction_type: 1, from: '2018-09-18', to: '2018-10-30', oc: 'Unknown'
        }
      ]
    }
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

  roomlist = [];

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

  resetRoom(rooms) {
    this.roomlist = rooms;
    console.log(rooms);
    this.room_labels = [];
    this.generateBody2();
  }

  generateBody() {


    this.lengthOfMonth = this.date.lengthOfMonth();
    this.totalNeededDays = this.DAYS;
    this.startingDay = this.date.dayOfMonth();
    this.endingDay = this.startingDay + this.totalNeededDays;


    this.rooms.forEach(room => {
      this.room_labels[this.rowIndex] = new Array();
      this.totalNeededDays = this.DAYS;

      const rm = `${room.name}-5-room`;
      this.room_labels[this.rowIndex].push(rm);



      if (this.endingDay > this.lengthOfMonth) {
        const newEndingDay = this.endingDay - this.lengthOfMonth;


        for (let i = this.startingDay; i <= this.lengthOfMonth; i++) {
          const parseDate = this.jodalLib.withDayOfMonth(i);
          const year = this.jodalLib.year();
          const month = this.jodalLib.monthValue();
          const monthName = this.jodalLib.month();
          const fulldate = `${year}-${month}-${i}`;


          this.checkMultipleBookings(parseDate.toString(), room.bookings, this.room_labels, this.rowIndex);



          // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // const rr = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // console.log(rr);

          this.totalNeededDays = this.totalNeededDays - 1;
        }



        const localJodaLib = this.jodalLib.plusMonths(1);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;

          this.checkMultipleBookings(parseDate.toString(), room.bookings, this.room_labels, this.rowIndex);

          // room.bookings.forEach(booking => {
          //   const strDate = this.checkBooking(booking.to, booking.from, parseDate.toString(), booking);
          //   this.room_labels[this.rowIndex].push(strDate);
          // });
        }


      } else {
        const localJodaLib = this.jodalLib.plusMonths(0);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;


          this.checkMultipleBookings(parseDate.toString(), room.bookings, this.room_labels, this.rowIndex);
          // const strDate = this.checkBooking(room.to, room.from, parseDate.toString(), room);
          // this.room_labels[this.rowIndex].push(strDate);

          // room.bookings.forEach(booking => {
          //   const strDate = this.checkBooking(booking.to, booking.from, parseDate.toString(), booking);
          //   this.room_labels[this.rowIndex].push(strDate);
          // });

        }
      }

      this.rowIndex += 1;




    });


  }

  checkMultipleBookings(date3, bookings, room_labels, rowIndex) {
    let seen = false;
    bookings.forEach(booking => {
      const d1 = new Date(booking.from);
      const d2 = new Date(booking.to);
      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const currentDate = LocalDate.parse(booking.from);
      for (let i = 0; i <= diffDays; i++) {
        const dt = currentDate.plusDays(i);
        const d33 = LocalDate.parse(date3).minusMonths(0);
        if (d33.equals(dt)) {
          const temp = `${booking.oc}-${booking.transaction_type}-booking`;
          room_labels[rowIndex].push(temp);
          seen = true;
          break;
        }
      }

    });



    if (seen) {
      return;
    } else {

      room_labels[rowIndex].push('');
      return;
    }





  }

  checkBooking(date2, date1, date3, booking) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const currentDate = LocalDate.parse(date1);
    for (let i = 0; i <= diffDays; i++) {
      const dt = currentDate.plusDays(i);
      const d33 = LocalDate.parse(date3).minusMonths(0);
      if (d33.equals(dt)) {
        return `${booking.oc}-${booking.transaction_type}-${booking.wing}-${booking.floor}`;
      }
    }
    return '';



  }


  generateBody2() {
    this.lengthOfMonth = this.date.lengthOfMonth();
    this.totalNeededDays = this.DAYS;
    this.startingDay = this.date.dayOfMonth();
    this.endingDay = this.startingDay + this.totalNeededDays;


    this.roomlist.forEach(room => {
      this.room_labels[this.rowIndex] = new Array();
      this.totalNeededDays = this.DAYS;

      const rm = `${room.room_name}-5-room`;
      this.room_labels[this.rowIndex].push(rm);



      if (this.endingDay > this.lengthOfMonth) {
        const newEndingDay = this.endingDay - this.lengthOfMonth;


        for (let i = this.startingDay; i <= this.lengthOfMonth; i++) {
          const parseDate = this.jodalLib.withDayOfMonth(i);
          const year = this.jodalLib.year();
          const month = this.jodalLib.monthValue();
          const monthName = this.jodalLib.month();
          const fulldate = `${year}-${month}-${i}`;


          this.checkMultipleBookings2(parseDate.toString(), room.reserved_rooms, this.room_labels, this.rowIndex);



          // `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // const rr = `${monthName.toString().substr(0, 3)}  ${i}  ${parseDate.dayOfWeek().toString().substring(0, 3)}`;
          // console.log(rr);

          this.totalNeededDays = this.totalNeededDays - 1;
        }



        const localJodaLib = this.jodalLib.plusMonths(1);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;

          this.checkMultipleBookings2(parseDate.toString(), room.reserved_rooms, this.room_labels, this.rowIndex);

          // room.bookings.forEach(booking => {
          //   const strDate = this.checkBooking(booking.to, booking.from, parseDate.toString(), booking);
          //   this.room_labels[this.rowIndex].push(strDate);
          // });
        }


      } else {
        const localJodaLib = this.jodalLib.plusMonths(0);
        for (let i = 1; i <= this.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;


          this.checkMultipleBookings2(parseDate.toString(), room.bookings, this.room_labels, this.rowIndex);
          // const strDate = this.checkBooking(room.to, room.from, parseDate.toString(), room);
          // this.room_labels[this.rowIndex].push(strDate);

          // room.bookings.forEach(booking => {
          //   const strDate = this.checkBooking(booking.to, booking.from, parseDate.toString(), booking);
          //   this.room_labels[this.rowIndex].push(strDate);
          // });

        }
      }

      this.rowIndex += 1;




    });


  }

  checkMultipleBookings2(date3, bookings, room_labels, rowIndex) {
    let seen = false;
    bookings.forEach(booking => {
      const t1 = booking.arrival.toString().split('T')[0];
      const t2 = booking.departure.toString().split('T')[0];
      const tempDate = LocalDate.parse(t1).plusDays(booking.num_of_night);
      console.log('Nigths=' + booking.num_of_night);
      const d1 = new Date(t1);
      const d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + booking.num_of_night);

      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const currentDate = LocalDate.parse(t1);
      for (let i = 0; i <= diffDays; i++) {
        const dt = currentDate.plusDays(i);
        const d33 = LocalDate.parse(date3).minusMonths(0);
        if (d33.equals(dt)) {
          const temp = `${booking.original_owner}-${booking.reserved_status}-booking`;
          room_labels[rowIndex].push(temp);
          seen = true;
          break;
        }
      }
    });
    if (seen) {
      return;
    } else {
      room_labels[rowIndex].push('');
      return;
    }
  }




}
