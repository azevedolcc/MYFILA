import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatasPage } from './datas';

@NgModule({
  declarations: [
    DatasPage,
  ],
  imports: [
    IonicPageModule.forChild(DatasPage),
  ],
})
export class DatasPageModule {}
