import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDate } from 'js-joda';
import { WingService } from '../../../services/wing.service';
import { FloorService } from '../../../services/floor.service';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-summary-bar',
  templateUrl: './summary-bar.component.html',
  styleUrls: ['./summary-bar.component.css']
})
export class SummaryBarComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDateChanged: EventEmitter<null> = new EventEmitter<null>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRoomListChanged: EventEmitter<null> = new EventEmitter<null>();

  date = LocalDate.now();
  wingList = [];
  floorList = [];
  roomList = [];

  constructor(private wingService: WingService,
    private floorService: FloorService,
    private roomService: RoomsService) { }

  ngOnInit() {
    this.wingService.getWings().subscribe(data => {
      this.wingList = data;
    });
  }

  changeDate(date) {
    this.onDateChanged.emit(date);
  }

  onWingChange(event) {
    this.floorList = [];
    this.floorService.getFloorByWingId(event.target.value).subscribe(data => {
      this.floorList = data;
    });
  }

  onFloorChange(event) {
    this.roomList = [];
    this.roomService.getRoomsByFloorId(event.target.value).subscribe(data => {
      this.roomList = data;
      this.onRoomListChanged.emit(data);
    });
  }

}
