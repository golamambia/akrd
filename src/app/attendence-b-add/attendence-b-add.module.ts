import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceBAddPageRoutingModule } from './attendence-b-add-routing.module';

import { AttendenceBAddPage } from './attendence-b-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceBAddPageRoutingModule
  ],
  declarations: [AttendenceBAddPage]
})
export class AttendenceBAddPageModule {}
