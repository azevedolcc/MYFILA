import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public usunameHome: string;

  constructor(public navCtrl: NavController, private usuProvider: UsuarioProvider) {
              this.usunameHome = this.usuProvider.nomeGlobal
              console.log("Global Home: " + this.usunameHome)

  }
}
