import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceBUpdatePageRoutingModule } from './attendence-b-update-routing.module';

import { AttendenceBUpdatePage } from './attendence-b-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceBUpdatePageRoutingModule
  ],
  declarations: [AttendenceBUpdatePage]
})
export class AttendenceBUpdatePageModule {}
