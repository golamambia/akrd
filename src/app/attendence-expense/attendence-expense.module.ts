import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendenceExpensePageRoutingModule } from './attendence-expense-routing.module';

import { AttendenceExpensePage } from './attendence-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendenceExpensePageRoutingModule
  ],
  declarations: [AttendenceExpensePage]
})
export class AttendenceExpensePageModule {}
