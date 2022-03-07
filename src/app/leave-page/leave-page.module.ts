import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeavePagePageRoutingModule } from './leave-page-routing.module';

import { LeavePagePage } from './leave-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeavePagePageRoutingModule
  ],
  declarations: [LeavePagePage]
})
export class LeavePagePageModule {}
