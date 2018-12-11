import { NgModule, NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { LaundryRoutingModule } from './laundry-routing.module';
import { HomeComponent } from './home/home.component';
import { PostGuestLaundryComponent } from './post-guest-laundry/post-guest-laundry.component';
import { PostHotelLaundryComponent } from './post-hotel-laundry/post-hotel-laundry.component';
import { ShareLibComponent } from './share-lib/share-lib.component';

@NgModule({
  imports: [
    CommonModule,
    LaundryRoutingModule,
    ChartsModule,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, PostGuestLaundryComponent, PostHotelLaundryComponent, ShareLibComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LaundryModule { }
