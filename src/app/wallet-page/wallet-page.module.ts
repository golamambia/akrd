import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletPagePageRoutingModule } from './wallet-page-routing.module';

import { WalletPagePage } from './wallet-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPagePageRoutingModule
  ],
  declarations: [WalletPagePage]
})
export class WalletPagePageModule {}
