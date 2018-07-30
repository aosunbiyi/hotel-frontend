import { Component, OnInit } from '@angular/core';
import { LocalDate } from 'js-joda';
import { ClarityIcons } from '@clr/icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-summary-bar',
  templateUrl: './summary-bar.component.html',
  styleUrls: ['./summary-bar.component.css']
})
export class SummaryBarComponent implements OnInit {

  date = LocalDate.now();

  constructor() { }

  ngOnInit() {
  }

  changeDate(date) {
    console.log('date changed ' + date);
  }

}
