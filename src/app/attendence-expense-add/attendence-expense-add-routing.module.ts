import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceExpenseAddPage } from './attendence-expense-add.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceExpenseAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceExpenseAddPageRoutingModule {}
