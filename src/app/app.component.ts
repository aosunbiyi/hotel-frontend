import { Component, OnDestroy, ViewChild, OnInit } from "@angular/core";
import { fadeAnimation } from "./animations";
import { LocalDate, LocalTime } from "js-joda";
import { Ticker } from "./services/ticker.model";
import { DataService } from "./backend/data.service";
import { ClrWizard } from "@clr/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [fadeAnimation]
})
export class AppComponent implements OnDestroy {
  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;

  day_name: any = "";
  open_out_of_order = false;
  month_name: any = "";
  day_number: any = "";
  year_name: any = "";
  time: any = "";
  tickers: Ticker[] = [];
  intervalHandle: any;
  open_wizard = false;
  roomTypes: any[] = [];
  rooms: any[] = [];
  out_of_order_list: any[] = [];

  roomTypes2: any[] = [];
  rooms2: any[] = [];

  out_of_order_start_date: any;
  out_of_order_end_date: any;
  out_of_order_reason: any;
  selectedRoomIds: any[] = [];

  menu_front_office = false;
  menu_laundry = false;
  menu_default = true;

  constructor(private ds: DataService) {
    this.intervalHandle = setInterval(() => {
      const day = LocalDate.now();
      const time = LocalTime.now();
      this.day_name = day.dayOfWeek();
      this.month_name = day.month();
      this.day_number = day.dayOfMonth();
      this.year_name = day.year();
      this.time = time.toString().split(".")[0];
    }, 1000);

    this.tickers = this.loadTickers();

    this.ds.getRoomTypes().subscribe(rTypes => {
      this.roomTypes = rTypes.roomTypes;
      this.roomTypes2 = rTypes.roomTypes;
    });
  }

  setNull(num) {
    this.menu_front_office = false;
    this.menu_default = false;
    this.menu_laundry = false;

    if (num === 1) {
      this.menu_front_office = true;
    }

    if (num === 0) {
      this.menu_default = true;
    }

    if (num === 2) {
      this.menu_laundry = true;
    }
  }

  on_open_out_of_order() {
    this.open_out_of_order = true;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
  }

  loadTickers() {
    return [
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      },
      {
        type: 2,
        title: "No Connection",
        message: "No Internet Connection in Room 505"
      },
      { type: 3, title: "House Keeping", message: "Room 305, is very dirty" },
      { type: 4, title: "No Stock", message: "Stock Level is very low" },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 202, Mr Ben is running out of deposited credit"
      },
      {
        type: 0,
        title: "Low Credit",
        message:
          "Custmer in room 201, Mr King is running out of deposited credit"
      },
      {
        type: 1,
        title: "Low Inventry",
        message: "The inventry is very low, please reorder"
      }
    ];
  }

  onRoomTypeChanged(event) {
    this.ds.getRoomById(event.target.value).subscribe(rms => {
      this.rooms = rms.rooms;
    });
  }

  onRoomTypeChanged2(event) {
    this.ds.getRoomById(event.target.value).subscribe(rms => {
      this.rooms2 = rms.rooms;
      console.log(this.rooms2);
    });
  }

  onFinish() {
    console.log(
      this.rooms2,
      this.out_of_order_start_date,
      this.out_of_order_end_date,
      this.out_of_order_reason
    );

    this.rooms2.forEach(room => {
      if (room.selected) {
        if (room.selected === true) {
          this.selectedRoomIds.push(room.id);
        }
      }
    });

    const data = {
      rooms: this.selectedRoomIds,
      out_of_order_start_date: this.out_of_order_start_date,
      out_of_order_end_date: this.out_of_order_end_date,
      out_of_order_reason: this.out_of_order_reason
    };

    this.ds.postOutofOrderRooms(data).subscribe(data2 => {
      this.out_of_order_list = data2;
    });
  }
}
