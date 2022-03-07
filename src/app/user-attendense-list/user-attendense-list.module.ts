import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAttendenseListPageRoutingModule } from './user-attendense-list-routing.module';

import { UserAttendenseListPage } from './user-attendense-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAttendenseListPageRoutingModule
  ],
  declarations: [UserAttendenseListPage]
})
export class UserAttendenseListPageModule {}
