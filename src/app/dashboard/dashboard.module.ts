import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryBarComponent } from './summary-bar/summary-bar.component';
import { DateBarComponent } from './date-bar/date-bar.component';
import { ClarityModule } from '@clr/angular';
import { SchedularComponent } from './schedular/schedular.component';
import { HeaderComponent } from './schedular/header/header.component';
import { BodyComponent } from './schedular/body/body.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule
  ],
  declarations: [DashboardComponent, SummaryBarComponent, DateBarComponent, SchedularComponent, HeaderComponent, BodyComponent],
  exports: [DashboardComponent, SummaryBarComponent, DateBarComponent]
})
export class DashboardModule { }
