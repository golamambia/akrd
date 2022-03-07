import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompactLeavePageRoutingModule } from './compact-leave-routing.module';

import { CompactLeavePage } from './compact-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompactLeavePageRoutingModule
  ],
  declarations: [CompactLeavePage]
})
export class CompactLeavePageModule {}
