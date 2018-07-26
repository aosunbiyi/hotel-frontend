import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
  animations: [
    trigger('slideOut', [
      transition(':leave', [
        style({
          marginLeft: 0,
          opacity: 1
        }),
        animate('1000ms ease-in-out', style({
          marginLeft: '-324px',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TickerComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('tickers') _tickers: any = [];
  tickers: any = [];
  interval: any;
  page = 0;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.nextAlert();
    }, 5000);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(): void {
    if (this._tickers.length && this.tickers.length < 30) {
      if (this.page * 100 > this._tickers.length) {
        this.page = 0;
      }
      const additions = this._tickers.slice(this.page * 100, (this.page + 1) * 100);
      this.tickers.push(...additions);
      this.page++;
    }
  }

  private nextAlert(): void {
    this.tickers.splice(0, 1);
  }
}
