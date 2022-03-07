import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkexpenseEditPageRoutingModule } from './workexpense-edit-routing.module';

import { WorkexpenseEditPage } from './workexpense-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkexpenseEditPageRoutingModule
  ],
  declarations: [WorkexpenseEditPage]
})
export class WorkexpenseEditPageModule {}
