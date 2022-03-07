import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceReportPageRoutingModule } from './attendence-report-routing.module';

import { AttendenceReportPage } from './attendence-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceReportPageRoutingModule
  ],
  declarations: [AttendenceReportPage]
})
export class AttendenceReportPageModule {}
