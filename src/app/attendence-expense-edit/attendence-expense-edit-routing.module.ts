import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceExpenseEditPage } from './attendence-expense-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceExpenseEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceExpenseEditPageRoutingModule {}
