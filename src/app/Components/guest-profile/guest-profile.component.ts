import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css']
})
export class GuestProfileComponent implements OnInit {

  isPersonalInfoOpened = true;
  isPersonalInfoOpened2 = true;
  isPersonalInfoOpened3 = true;
  isPersonalInfoOpened4 = true;

  guests = [
    {
      id: 1, guestName: 'fred amata', country: 'nigeria', source: 'booking.com', email: 'fred@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
    {
      id: 2, guestName: 'fred amata', country: 'nigeria', source: 'booking.com', email: 'fred@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
    {
      id: 3, guestName: 'ben king', country: 'nigeria', source: 'hotel.com', email: 'ben@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
    {
      id: 4, guestName: 'fred amata', country: 'nigeria', source: 'booking.com', email: 'fred@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
    {
      id: 5, guestName: 'fred amata', country: 'nigeria', source: 'booking.com', email: 'fred@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
    {
      id: 6, guestName: 'fred amata', country: 'nigeria', source: 'booking.com', email: 'fred@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
    {
      id: 7, guestName: 'fred amata', country: 'nigeria', source: 'booking.com', email: 'fred@mail.com',
      city: 'Lagos', phone: '08174536789'
    },
  ];


  constructor() { }

  ngOnInit() {
  }


  togglePersonalInfoOpened() {
    this.isPersonalInfoOpened = !this.isPersonalInfoOpened;
  }

  togglePersonalInfoOpened2() {
    this.isPersonalInfoOpened2 = !this.isPersonalInfoOpened2;
  }

  togglePersonalInfoOpened3() {
    this.isPersonalInfoOpened3 = !this.isPersonalInfoOpened3;
  }

  togglePersonalInfoOpened4() {
    this.isPersonalInfoOpened4 = !this.isPersonalInfoOpened4;
  }




}
