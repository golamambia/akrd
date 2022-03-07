import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnRequestPage } from './return-request.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnRequestPageRoutingModule {}
