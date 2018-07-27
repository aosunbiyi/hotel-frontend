import { Component, OnInit } from '@angular/core';
import { LocalDate, LocalTime } from 'js-joda';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  labels: any[] = [];

  constructor() {
    this.labels.push('+/-');
    this.labels.push('Rooms');
    const date = LocalDate.now();
    const totalDays = date.lengthOfMonth();
    const totalNeededDays = 15;
    const startingDay = date.dayOfMonth();
    const endingDay = startingDay + totalNeededDays;

    // if(endingDay > (totalDays+startingDay)){
    //   endingDay=totalDays;
    // }

    console.log(endingDay);

  }

  ngOnInit() {
  }

}
