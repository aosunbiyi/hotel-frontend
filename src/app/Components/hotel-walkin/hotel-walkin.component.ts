import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../backend/data.service';
import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-hotel-walkin',
  templateUrl: './hotel-walkin.component.html',
  styleUrls: ['./hotel-walkin.component.css']
})
export class HotelWalkinComponent implements OnInit {
  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;
  open_wizard = false;
  roomTypes: any[] = [];
  rooms: any[] = [];
  rateTypes: any[] = [];
  rates: any[] = [];
  wings: any[] = [];
  floors: any[] = [];
  taxes: any[] = [];
  businessSourceTypes: any[] = [];
  businessSources: any[] = [];


  walkins: Walkin[] = [
    { id: 1, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 2, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 3, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 4, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 5, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 6, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 7, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 8, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 9, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 },
    { id: 10, guestName: 'fred amata', identity: 'passport', roomType: 'Special', room: 'Room B', rate: 3450 }

  ];

  constructor(private ds: DataService) {

    this.ds.getRoomTypes().subscribe(rTypes => {
      this.roomTypes = rTypes.roomTypes;
    });

    this.ds.getRateTypes().subscribe(rt => {
      this.rateTypes = rt.rateTypes;
    });

    this.ds.getWings().subscribe(w => {
      this.wings = w.wings;
    });

    this.ds.getAllTax().subscribe(t => {
      this.taxes = t.taxes;
    });

    this.ds.getAllBusinessSourceTypes().subscribe(b => {
      this.businessSourceTypes = b.businessSourceTypes;
      console.log(this.businessSourceTypes);
    });


  }

  ngOnInit() {
  }

  onFinish() {
    this.open_wizard = false;
  }

  onNew() {
    this.open_wizard = true;
  }

  onRoomTypeChanged(event) {
    this.ds.getRoomById(event.target.value).subscribe(rms => {
      this.rooms = rms.rooms;
    });
  }

  onRateTypeChanged(event) {
    this.ds.getRateById(event.target.value).subscribe(rms => {
      this.rates = rms.rates;
    });
  }

  onWingChanged(event) {
    this.ds.getFloorByWingId(event.target.value).subscribe(rms => {
      this.floors = rms.floors;
    });
  }

  onFloorChanged(event) {
    this.ds.getRoomByFloorID(event.target.value).subscribe(rms => {
      this.rooms = rms.rooms;
    });
  }

  onBusinessSourceChanged(event) {
    this.ds.getBusinessSourceByTypeId(event.target.value).subscribe(rms => {
      this.businessSources = rms.businessSources;
    });
  }


}


export interface Walkin {
  id: number;
  guestName: string;
  identity: string;
  roomType: string;
  room: string;
  rate: number;
}
