import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnRequestPageRoutingModule } from './return-request-routing.module';

import { ReturnRequestPage } from './return-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnRequestPageRoutingModule
  ],
  declarations: [ReturnRequestPage]
})
export class ReturnRequestPageModule {}
