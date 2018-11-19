import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-room-look-up',
  templateUrl: './room-look-up.component.html',
  styleUrls: ['./room-look-up.component.css']
})
export class RoomLookUpComponent implements OnInit {

  rooms: any = [];
  constructor(public roomService: RoomsService) {
    console.dir(this.roomService);
    console.log('inside the constructor');
  }

  ngOnInit() {
    this.getAcounts();
  }

  getAcounts() {
    this.rooms = [];
    this.roomService.getRooms().subscribe((data: {}) => {
      console.log(data);
      this.rooms = data;
    });
  }

}
