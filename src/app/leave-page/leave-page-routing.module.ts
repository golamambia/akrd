import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeavePagePage } from './leave-page.page';

const routes: Routes = [
  {
    path: '',
    component: LeavePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavePagePageRoutingModule {}
