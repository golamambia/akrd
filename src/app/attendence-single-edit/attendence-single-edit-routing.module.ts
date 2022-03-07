import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceSingleEditPage } from './attendence-single-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceSingleEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceSingleEditPageRoutingModule {}
