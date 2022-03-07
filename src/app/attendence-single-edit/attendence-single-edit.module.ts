import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceSingleEditPageRoutingModule } from './attendence-single-edit-routing.module';

import { AttendenceSingleEditPage } from './attendence-single-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceSingleEditPageRoutingModule
  ],
  declarations: [AttendenceSingleEditPage]
})
export class AttendenceSingleEditPageModule {}
