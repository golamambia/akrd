import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendenceSinglePage } from './attendence-single.page';

const routes: Routes = [
  {
    path: '',
    component: AttendenceSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendenceSinglePageRoutingModule {}
