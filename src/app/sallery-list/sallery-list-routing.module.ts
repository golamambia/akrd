import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalleryListPage } from './sallery-list.page';

const routes: Routes = [
  {
    path: '',
    component: SalleryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalleryListPageRoutingModule {}
