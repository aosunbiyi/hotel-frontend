import { NgModule,  NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryBarComponent } from './summary-bar/summary-bar.component';
import { DateBarComponent } from './date-bar/date-bar.component';
import { SchedularComponent } from './schedular/schedular.component';
import { HeaderComponent } from './schedular/header/header.component';
import { BodyComponent } from './schedular/body/body.component';
import { BookStatusComponent } from './schedular/book-status/book-status.component';
import { CardHoverDirective } from './schedular/directives/card-hover.directive';
import { RoomStatusComponent } from './schedular/room-status/room-status.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [DashboardComponent, SummaryBarComponent, DateBarComponent, SchedularComponent, HeaderComponent, BodyComponent, BookStatusComponent, CardHoverDirective, RoomStatusComponent],
  exports: [DashboardComponent, SummaryBarComponent, DateBarComponent]
})
export class DashboardModule { }
