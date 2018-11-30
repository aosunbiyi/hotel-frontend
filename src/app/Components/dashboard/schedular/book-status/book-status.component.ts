import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { RoomsService } from '../../../../services/rooms.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-book-status',
  templateUrl: './book-status.component.html',
  styleUrls: ['./book-status.component.css']
})
export class BookStatusComponent implements OnInit {

  @ViewChild('comp', { read: ElementRef }) comp: ElementRef;

  @Input() label: String = '';

  bgColor: String = '';
  occupantName: String = '';
  transactionType: String = '';
  isRoom = false;
  isBookingMenu = false;
  isEmptyMenu = false;
  componentType: String = '';
  entity_id = 0;
  lodingRoomDetails = false;
  roomDetails = {
    floor_: {},
    room_images: [],
    room_name: '',
    room_type_: {},
    rooms_amenities: [],
    room_owner_: {
      first_name: '',
      last_name: ''
    }
  };

  baseUrl;
  isCheckedIn = false;
  isReserved = false;


  constructor(private el: ElementRef, private roomService: RoomsService) { }

  ngOnInit() {

    this.baseUrl = environment.baseIp;
    if (this.label !== '' && this.label.length > 0) {
      const list = this.label.split('-');
      this.occupantName = list[0];
      this.transactionType = list[1];
      this.componentType = list[2];
      this.entity_id = parseInt(list[3], 10);

      if (this.transactionType === 'CheckIn') {
        this.comp.nativeElement.classList.add('red');
        this.comp.nativeElement.classList.add('CheckIn');
      }

      if (this.transactionType === 'Reserved') {
        this.comp.nativeElement.classList.add('blue');
        this.comp.nativeElement.classList.add('Reserved');
      }

      if (this.transactionType === '5') {
        this.comp.nativeElement.classList.add('green');
        this.comp.nativeElement.classList.add('room');
      }

    }
  }

  open() {

    if (this.transactionType === '5') {
      this.isRoom = true;
      this.lodingRoomDetails = true;
      const vm = this;

      this.roomService.getRoomById(this.entity_id).subscribe(function (data) {
        vm.roomDetails = data;
        console.log(data);
        setTimeout(() => {
          vm.lodingRoomDetails = false;
        }, 1500);

      });
    }
    if (this.transactionType === 'CheckIn') {
      this.isCheckedIn = true;
    }

    if (this.transactionType === 'Reserved') {
      this.isReserved = true;
    }

    if (this.componentType === '') {
      this.isEmptyMenu = true;
    }

  }

}
