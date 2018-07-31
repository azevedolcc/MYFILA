import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadUsuPage } from './cadusupage';

@NgModule({
  declarations: [
    CadUsuPage,
  ],
  imports: [
    IonicPageModule.forChild(CadUsuPage),
  ],
})
export class CadUsuPageModule {}
