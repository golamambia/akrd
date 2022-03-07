import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceExpenseEditPageRoutingModule } from './attendence-expense-edit-routing.module';

import { AttendenceExpenseEditPage } from './attendence-expense-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceExpenseEditPageRoutingModule
  ],
  declarations: [AttendenceExpenseEditPage]
})
export class AttendenceExpenseEditPageModule {}
