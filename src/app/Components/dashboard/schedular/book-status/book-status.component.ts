import { Component, OnInit, Input, ElementRef, ViewChild, Output , EventEmitter } from '@angular/core';
import { RoomsService } from '../../../../services/rooms.service';
import { environment } from '../../../../../environments/environment';
import { ReservationsService } from '../../../../services/reservations.service';

@Component({
  selector: 'app-book-status',
  templateUrl: './book-status.component.html',
  styleUrls: ['./book-status.component.css']
})
export class BookStatusComponent implements OnInit {

  @ViewChild('comp', { read: ElementRef }) comp: ElementRef;

  @Input() label: String = '';
  @Output() onNewWalkin = new EventEmitter();

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
  RoomRate;
  onCheckinMode = false;
  isLoadingBookinDetails = false;
  checkinReservation = null;
  open_wizard=false;


  constructor(private el: ElementRef, private roomService: RoomsService, private reservationsService: ReservationsService) { }

  ngOnInit() {
    const vm = this;

    this.baseUrl = environment.baseIp;
    if (this.label !== '' && this.label.length > 3) {
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
        const data = {
          room_id: this.entity_id
        };
          this.reservationsService.get_total_reservation_rate_by_room_id(data).subscribe(function(result){
            setTimeout(() => {
           vm.RoomRate = result;
            }, 1500);
          },function(err){
            console.log(err);
         });
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

  OpenWalkingDialog(){
    this.isEmptyMenu = false; 
    this.onNewWalkin.emit(this.label.toString());
  }

  OnCheckinClicked(){
    const vm = this;
    this.isReserved = false;
    this.onCheckinMode = true;
    this.isLoadingBookinDetails = false;
    this.reservationsService.getReservationById(this.entity_id).subscribe(function(result){
     setTimeout(() => {
      vm.checkinReservation = result;
      vm.isLoadingBookinDetails = true;
     }, 1500);
    });
  }

  getDiscountStatus(onDiscount, sl) {
    if (onDiscount === 1) {
      return '<a  class="label label-purple clickable">Yes<span class="badge">' + sl.discount_value + '</span></a>';
    } else {
      return '<span class="label label-warning">No</span>';
    }
  }

  getReservationStatus(status) {

    if (status === 'Open') {
      return '<span class="label label-success">Open</span>';
    } else {
      return '<span class="label label-info">Close</span>';
    }
  }

  onCheckInClicked2() {
    const vm = this;
    if (confirm('Are you sure you want to check in?') === true) {
      const dt = {
        id: vm.entity_id
      };
      this.reservationsService.checkin_reservation(dt).subscribe(function (result) {
        alert(result.data);
        vm.checkinReservation = null;
        vm.onCheckinMode = false;
        window.location.reload();
      });
    }
  }



}
