import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalLeavePage } from './medical-leave.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalLeavePageRoutingModule {}
