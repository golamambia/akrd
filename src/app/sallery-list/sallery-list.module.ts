import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalleryListPageRoutingModule } from './sallery-list-routing.module';

import { SalleryListPage } from './sallery-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalleryListPageRoutingModule
  ],
  declarations: [SalleryListPage]
})
export class SalleryListPageModule {}
