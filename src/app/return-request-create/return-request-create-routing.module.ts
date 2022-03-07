import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnRequestCreatePage } from './return-request-create.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnRequestCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnRequestCreatePageRoutingModule {}
