import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceExpensePage } from './attendence-expense.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceExpensePageRoutingModule {}
