import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatasPage } from './../pages/datas/datas';
import { HorasDispPage } from './../pages/horas-disp/horas-disp'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { AltSenPage } from '../pages/altsenpage/altsenpage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadUsuPage } from '../pages/cadusupage/cadusupage';
import { AltCadasPage } from '../pages/altcadaspage/altcadaspage';

import { UsuarioProvider } from '../providers/usuario/usuario';
import { ProfissionalProvider } from '../providers/profissional/profissional';
import { AgendaProvider } from '../providers/agenda/agenda';
import { MovAgendaProvider } from '../providers/mov-agenda/mov-agenda';
import { UsuAgendaPage } from '../pages/usu-agenda/usu-agenda';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CadUsuPage,
    AltSenPage,
    AltCadasPage,
    DatasPage,
    HorasDispPage,
    UsuAgendaPage
   ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CadUsuPage,
    AltSenPage,
    AltCadasPage,
    DatasPage,
    HorasDispPage,
    UsuAgendaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    ProfissionalProvider,
    AgendaProvider,
    MovAgendaProvider
  ]
})
export class AppModule { 
  private static url: string = "http://199.169.0.9/ws/ListarEstados.ashx";

  static getUrl(){
    return this.url;
  }
}
