import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrDatagridStringFilterInterface } from '@clr/angular';

class GuestFilter implements ClrDatagridStringFilterInterface<Guest> {
  accepts(guest: Guest, search: string): boolean {
    return guest.guestName.toLowerCase().indexOf(search) >= 0
      || guest.country.toLowerCase().indexOf(search) >= 0
      || guest.source.toLowerCase().indexOf(search) >= 0
      || guest.email.toLowerCase().indexOf(search) >= 0
      || guest.city.toLowerCase().indexOf(search) >= 0
      || guest.phone.toLowerCase().indexOf(search) >= 0;
  }
}


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
  guestFilter: GuestFilter = new GuestFilter();
  canEdit = false;

  guests: Guest[] = [
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

  onEdit() {
    this.canEdit = true;
  }




}


export interface Guest {
  id: number;
  guestName: string;
  country: string;
  source: string;
  email: string;
  city: string;
  phone: string;
}
