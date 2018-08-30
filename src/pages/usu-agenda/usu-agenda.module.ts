import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuAgendaPage } from './usu-agenda';

@NgModule({
  declarations: [
    UsuAgendaPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuAgendaPage),
  ],
})
export class UsuAgendaPageModule {}
