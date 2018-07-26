import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { TickerComponent } from './ticker/ticker.component';


@NgModule({
  declarations: [
    AppComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
