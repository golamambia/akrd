import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAttendenseListPage } from './user-attendense-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserAttendenseListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAttendenseListPageRoutingModule {}
