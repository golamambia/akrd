import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkexpenseListPage } from './workexpense-list.page';

const routes: Routes = [
  {
    path: '',
    component: WorkexpenseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkexpenseListPageRoutingModule {}
