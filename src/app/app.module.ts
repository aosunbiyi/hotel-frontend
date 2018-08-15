import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BackendModule } from './backend/backend.module';


import { AppComponent } from './app.component';
import { TickerComponent } from './ticker/ticker.component';
import { AuthInterceptor } from './backend/auth.interceptor';
import { HeaderInterceptor } from './backend/header.interceptor';

import { RoomtypeService } from './services/roomtype.service';
import { RoomService } from './services/room.service';
import { FloorService } from './services/floor.service';
import { OutoforderService } from './services/outoforder.service';
import { ReservationService } from './services/reservation.service';
import { WingService } from './services/wing.service';


@NgModule({
  declarations: [
    AppComponent,
    TickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    BackendModule,
    ClarityModule,
    DashboardModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    RoomService,
    RoomtypeService,
    FloorService,
    OutoforderService,
    ReservationService,
    WingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
