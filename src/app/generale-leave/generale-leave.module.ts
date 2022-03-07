import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneraleLeavePageRoutingModule } from './generale-leave-routing.module';

import { GeneraleLeavePage } from './generale-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraleLeavePageRoutingModule
  ],
  declarations: [GeneraleLeavePage]
})
export class GeneraleLeavePageModule {}
