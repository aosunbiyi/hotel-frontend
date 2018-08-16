import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrFormsNextModule  } from '@clr/angular';
import { DashboardModule } from './Components/dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BackendModule } from './backend/backend.module';


import { AppComponent } from './app.component';
import { TickerComponent } from './Components/ticker/ticker.component';
import { AuthInterceptor } from './backend/auth.interceptor';
import { HeaderInterceptor } from './backend/header.interceptor';
import { AppRoutes } from './app.routes';

import { RoomtypeService } from './services/roomtype.service';
import { RoomService } from './services/room.service';
import { FloorService } from './services/floor.service';
import { OutoforderService } from './services/outoforder.service';
import { ReservationService } from './services/reservation.service';
import { WingService } from './services/wing.service';
import { GuestProfileComponent } from './Components/guest-profile/guest-profile.component';
import { HomeComponent } from './Components/home/home.component';
import { MainDashboardComponent } from './Components/main-dashboard/main-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TickerComponent,
    GuestProfileComponent,
    HomeComponent,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    BackendModule,
    ClarityModule,
    ClrFormsNextModule ,
    DashboardModule,
    FormsModule,
    AppRoutes
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
