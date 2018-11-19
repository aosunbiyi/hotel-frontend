import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: BookingListComponent
  },
  {
    path: 'new-booking',
    component: NewBookingComponent
  },
  {
    path: 'checkin',
    component: CheckinComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent
  },
  {
    path: 'out-of-order',
    component: OutOfOrderComponent
  },
  {
    path: 'guest-ledger',
    component: GuestLedgerComponent
  },
  {
    path: 'arrival-list',
    component: ArrivalListComponent
  },
  {
    path: 'departure-list',
    component: DepartureListComponent
  },
  {
    path: 'guest-database',
    component: GuestDataBaseComponent
  },
  {
    path: 'guest-messages',
    component: GuestMessageComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
