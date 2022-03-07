import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompactLeavePage } from './compact-leave.page';

const routes: Routes = [
  {
    path: '',
    component: CompactLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompactLeavePageRoutingModule {}
