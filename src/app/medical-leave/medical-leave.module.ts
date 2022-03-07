import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalLeavePageRoutingModule } from './medical-leave-routing.module';

import { MedicalLeavePage } from './medical-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalLeavePageRoutingModule
  ],
  declarations: [MedicalLeavePage]
})
export class MedicalLeavePageModule {}
