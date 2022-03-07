import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceReportPage } from './attendence-report.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceReportPageRoutingModule {}
