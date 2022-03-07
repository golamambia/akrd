import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkexpenseListPageRoutingModule } from './workexpense-list-routing.module';

import { WorkexpenseListPage } from './workexpense-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkexpenseListPageRoutingModule
  ],
  declarations: [WorkexpenseListPage]
})
export class WorkexpenseListPageModule {}
