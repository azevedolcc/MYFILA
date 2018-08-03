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
 
    let toast = this.toastCtrl.create({duration: 3000, position: 'middle' });
    let modal = this.modalCtrl.create(CadUsuPage);
 
    modal.onDidDismiss(review => {
      console.log("acessopage: " + review.nome + " " + review.email );
    if(review) {
        this.usuProvider.createUsuario(review)
         .then((result: any) => {
           toast.setMessage("Usuário cadastrado com sucesso.");
           toast.present();          
         })
         .catch((error: any) => {
           console.log("Erro cad: " + error.message + "/" + error.code + "/" + error.status + "/" + error.data);
           toast.setMessage("Erro no cadastramento do usuário." + error.status);
           toast.present();     
           //this.navCtrl.push(CadUsuPage);
         })
        console.log("Voltei: " + review.nome );
    } 
           
    });
 
    modal.present();
 
  }

}
