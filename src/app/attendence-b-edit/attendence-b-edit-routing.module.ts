import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceBEditPage } from './attendence-b-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceBEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceBEditPageRoutingModule {}
