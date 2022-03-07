import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletPagePage } from './wallet-page.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPagePageRoutingModule {}
