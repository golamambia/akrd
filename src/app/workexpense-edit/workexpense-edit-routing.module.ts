import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkexpenseEditPage } from './workexpense-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WorkexpenseEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkexpenseEditPageRoutingModule {}
