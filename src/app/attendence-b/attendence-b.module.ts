import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceBPageRoutingModule } from './attendence-b-routing.module';

import { AttendenceBPage } from './attendence-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceBPageRoutingModule
  ],
  declarations: [AttendenceBPage]
})
export class AttendenceBPageModule {}
