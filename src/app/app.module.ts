import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { DashboardModule } from './Components/dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BackendModule } from './backend/backend.module';


import { AppComponent } from './app.component';
import { TickerComponent } from './Components/ticker/ticker.component';
import { AuthInterceptor } from './backend/auth.interceptor';
import { HeaderInterceptor } from './backend/header.interceptor';
import { AppRoutes } from './app.routes';

import { RoomtypeService } from './services/roomtype.service';
import { FloorService } from './services/floor.service';
import { OutoforderService } from './services/outoforder.service';
import { WingService } from './services/wing.service';
import { GuestProfileComponent } from './Components/guest-profile/guest-profile.component';
import { HomeComponent } from './Components/home/home.component';
import { MainDashboardComponent } from './Components/main-dashboard/main-dashboard.component';
import { HotelWalkinComponent } from './Components/hotel-walkin/hotel-walkin.component';
import { AccountsService } from './services/accounts.service';

import { RoomManagerModule } from './Components/room-manager/room-manager.module';
import { FrontOfficeModule } from './Components/front-office/front-office.module';



@NgModule({
  declarations: [
    AppComponent,
    TickerComponent,
    GuestProfileComponent,
    HomeComponent,
    MainDashboardComponent,
    HotelWalkinComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    BackendModule,
    ClarityModule,
    ClrFormsNextModule,
    DashboardModule,
    FormsModule,
    ReactiveFormsModule,
    RoomManagerModule,
    AppRoutes,
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    RoomtypeService,
    FloorService,
    OutoforderService,
    WingService,
    AccountsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
