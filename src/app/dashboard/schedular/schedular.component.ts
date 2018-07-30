import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

  @Input() startdate: any;

  constructor() {
    console.log('from schedular start date=' + this.startdate);
  }

  ngOnInit() {
  }

}
