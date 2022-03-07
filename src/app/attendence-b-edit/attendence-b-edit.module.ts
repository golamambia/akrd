import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceBEditPageRoutingModule } from './attendence-b-edit-routing.module';

import { AttendenceBEditPage } from './attendence-b-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceBEditPageRoutingModule
  ],
  declarations: [AttendenceBEditPage]
})
export class AttendenceBEditPageModule {}
