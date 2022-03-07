import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraleLeavePage } from './generale-leave.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraleLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraleLeavePageRoutingModule {}
