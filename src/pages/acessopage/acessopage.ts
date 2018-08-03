import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, ToastController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';
import { CadUsuPage } from '../../pages/cadusupage/cadusupage';

@IonicPage()
@Component({
  selector: 'acessopage',
  templateUrl: 'acessopage.html',
})
export class AcessoPage {

  usuario: any;

  public usuemail: string;  
  public usupassword: string;  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public menu: MenuController,
              public modalCtrl: ModalController,
              public usuProvider: UsuarioProvider,
              public toastCtrl: ToastController) {

              this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcessoPage');
  }

  acessar(usuemail, usupassword ){
    console.log( "Logar ===> " + this.usuemail + "->" + this.usupassword);
    if (this.usuemail !== null && this.usupassword !== null) {
      console.log( "Vou chamar o metodo para Logar ===> " )
      this.usuProvider.loginUsuario(usuemail, usupassword); 
    }
    
    //this.navCtrl.setRoot(HomePage);
  } 

  //cadusu(){
  //  this.navCtrl.push(CadUsuPage);
  //}

  cadUsu(){
     this.navCtrl.push(CadUsuPage);
  }

}
