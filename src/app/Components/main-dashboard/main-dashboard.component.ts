import { Component, OnDestroy } from '@angular/core';
import { LocalDate, LocalTime } from 'js-joda';
import { ClrWizard } from '@clr/angular';


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnDestroy {


  day_name: any = '';
  open_out_of_order = false;
  month_name: any = '';
  day_number: any = '';
  year_name: any = '';
  time: any = '';
  intervalHandle: any;


  constructor() {

    this.intervalHandle = setInterval(() => {
      const day = LocalDate.now();
      const time = LocalTime.now();
      this.day_name = day.dayOfWeek();
      this.month_name = day.month();
      this.day_number = day.dayOfMonth();
      this.year_name = day.year();
      this.time = time.toString().split('.')[0];
    }, 1000);


  }

  on_open_out_of_order() {
    this.open_out_of_order = true;
  }


  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
  }

}
