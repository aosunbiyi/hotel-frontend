import { Component, OnInit , ViewChild} from '@angular/core';
import { ShareLibComponent } from "../share-lib/share-lib.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(ShareLibComponent) shared: ShareLibComponent;
  public barChartLabels:string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Delivered'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Undelivered'}
  ];

  constructor() { }

  ngOnInit() {
    const vm= this;
     setInterval(() => {
       vm.randomize();
     }, 2500);
  }

  public onPostGuestLaundryClicked(event){
   this.shared.onPostGuestLaundry();
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    let data = [
      Math.round(Math.random() * 120),
      59,
      80,
      (Math.random() * 120),
      56,
      (Math.random() * 120),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
