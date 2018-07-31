import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryBarComponent } from './summary-bar/summary-bar.component';
import { DateBarComponent } from './date-bar/date-bar.component';
import { ClarityModule } from '@clr/angular';
import { SchedularComponent } from './schedular/schedular.component';
import { HeaderComponent } from './schedular/header/header.component';
import { BodyComponent } from './schedular/body/body.component';
import { BookStatusComponent } from './schedular/book-status/book-status.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  declarations: [DashboardComponent, SummaryBarComponent, DateBarComponent, SchedularComponent, HeaderComponent, BodyComponent, BookStatusComponent],
  exports: [DashboardComponent, SummaryBarComponent, DateBarComponent]
})
export class DashboardModule { }
