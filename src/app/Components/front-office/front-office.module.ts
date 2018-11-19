import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { WalkinComponent } from './walkin/walkin.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { OutOfOrderComponent } from './out-of-order/out-of-order.component';
import { GuestLedgerComponent } from './guest-ledger/guest-ledger.component';
import { ArrivalListComponent } from './arrival-list/arrival-list.component';
import { DepartureListComponent } from './departure-list/departure-list.component';
import { GuestDataBaseComponent } from './guest-data-base/guest-data-base.component';
import { GuestMessageComponent } from './guest-message/guest-message.component';
import { CheckinComponent } from './checkin/checkin.component';

@NgModule({
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [NewBookingComponent, BookingListComponent, WalkinComponent, ReservationComponent,
    ReservationListComponent, OutOfOrderComponent, GuestLedgerComponent, ArrivalListComponent,
    DepartureListComponent, GuestDataBaseComponent, GuestMessageComponent, CheckinComponent]
})
export class FrontOfficeModule { }
