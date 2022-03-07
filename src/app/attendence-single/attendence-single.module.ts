import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceSinglePageRoutingModule } from './attendence-single-routing.module';

import { AttendenceSinglePage } from './attendence-single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceSinglePageRoutingModule
  ],
  declarations: [AttendenceSinglePage]
})
export class AttendenceSinglePageModule {}
