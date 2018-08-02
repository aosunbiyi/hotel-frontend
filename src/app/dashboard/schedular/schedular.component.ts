import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

  @ViewChild(HeaderComponent) header: HeaderComponent;
  @ViewChild(BodyComponent) body: BodyComponent;

  constructor() {

  }

  onDateChanged(date) {
    this.header.reSetDate(date);
    this.body.reSetDate(date);
  }

  ngOnInit() {
  }

}
