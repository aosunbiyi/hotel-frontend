import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';


import { HomeComponent } from "./home/home.component";
import { PostGuestLaundryComponent } from "./post-guest-laundry/post-guest-laundry.component";
import { PostHotelLaundryComponent } from "./post-hotel-laundry/post-hotel-laundry.component";

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'post_guest_laundry',
    component : PostGuestLaundryComponent
  },
  {
    path:'post_hotel_laundry',
    component: PostHotelLaundryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaundryRoutingModule { }
