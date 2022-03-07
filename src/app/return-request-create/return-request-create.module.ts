import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnRequestCreatePageRoutingModule } from './return-request-create-routing.module';

import { ReturnRequestCreatePage } from './return-request-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnRequestCreatePageRoutingModule
  ],
  declarations: [ReturnRequestCreatePage]
})
export class ReturnRequestCreatePageModule {}
