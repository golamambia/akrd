import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceBAddPage } from './attendence-b-add.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceBAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceBAddPageRoutingModule {}
