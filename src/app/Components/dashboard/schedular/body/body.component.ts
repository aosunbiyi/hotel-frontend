import { Component, OnInit } from '@angular/core';
import { LocalDate, LocalTime } from 'js-joda';
import { RoomsService } from '../../../../services/rooms.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  labels: any[] = [];
  room_labels: any[] = [];
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

  /**
   * Constructor
   * @param roomService
   */
  constructor(private roomService: RoomsService) {
    this.jodalLib = LocalDate.now();
    this.date = LocalDate.now();
  }

  /**
   * ngOnInit
   * Get all the rooms
   */
  ngOnInit() {
    const vm = this;
    this.roomService.getRooms().subscribe(function (data) {
      vm.roomlist = data;
      this.room_labels = [];
      vm.generateBody2();
    });
  }

  reSetDate(date) {
    this.date = LocalDate.parse(date);
    this.jodalLib = LocalDate.parse(date);
    // empty the room labels
    this.room_labels = [];
    // generate the schedule body.
    this.generateBody2();
  }

  resetRoom(rooms) {
    this.roomlist = rooms;
    // empty the room labels
    this.room_labels = [];
    // generate the schedule body.
    this.generateBody2();
  }



  generateBody2() {
    // get the Length of the Month
    this.lengthOfMonth = this.date.lengthOfMonth();
    // Get the total days to be displayed
    this.totalNeededDays = this.DAYS;
    // get the starting day
    this.startingDay = this.date.dayOfMonth();
    // Get the total ending day
    this.endingDay = this.startingDay + this.totalNeededDays;

    // iterate on all the available rooms
    this.roomlist.forEach(room => {
      // initialize the bookings on each room
      this.room_labels[this.rowIndex] = new Array();
      this.totalNeededDays = this.DAYS;
      const rm = `${room.room_name}-5-room-${room.id}`;
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
        }
      }
      this.rowIndex += 1;
    });


  }

  checkMultipleBookings2(date3, reserved_rooms, room_labels, rowIndex) {
    let seen = false;
    let _date1 = null;
    reserved_rooms.forEach(booking => {
      const t1 = booking.arrival.toString().split('T')[0];
      const t2 = booking.departure.toString().split('T')[0];
      const tempDate = LocalDate.parse(t1).plusDays(booking.num_of_night);
      const d1 = new Date(t1);
      const d2 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + booking.num_of_night);
      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const currentDate = LocalDate.parse(t1);
      for (let i = 0; i <= diffDays - 1; i++) {
        const dt = currentDate.plusDays(i);
        const d33 = LocalDate.parse(date3).minusMonths(0);

        if (d33.equals(dt)) {
          const temp = `${booking.original_owner}-${booking.reserved_status}-booking-${booking.reservation_id}`;
          room_labels[rowIndex].push(temp);
          seen = true;
          _date1 = { d1: d33, d2: dt };
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
