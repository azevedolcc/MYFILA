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

  acessar() {

    let toast = this.toastCtrl.create({duration: 3000, position: 'middle'});

    console.log( "Logar ===> " + this.usuemail + " -> " + this.usupassword);
    if (this.usuemail !== null && this.usupassword !== null && this.usuemail !== '' && typeof this.usuemail !== "undefined") {
      console.log( "Vou chamar o metodo para Logar ===> " )
      this.usuProvider.getEmail(this.usuemail).then((data) => {
              this.usuario = data
              console.log("Voltei do getEmail: " + data +  this.usuemail)
              console.log(this.usuario[0].email + ' ' + this.usuario[0].password)
              if (this.usupassword !== this.usuario[0].password) {
                    toast.setMessage("Encontramos problemas no seu login. Verifique a senha e tente novamente.");
                    toast.present(); 
              } else {
                    this.usuProvider.nomeGlobal = this.usuario[0].nome;
                    this.usuProvider.emailGlobal = this.usuario[0].email;
                    console.log("Global: " + this.usuProvider.nomeGlobal)
                    toast.setMessage("Usuário logado com sucesso.");
                    toast.present();
                    this.navCtrl.setRoot(HomePage);
              }       
          })
          .catch((error: any) => {
                    toast.setMessage("Não foi encontrado usuário com login " + this.usuemail);
                    toast.present();          
          })
    } else {
      toast.setMessage("Email e senha devem ser preenchidos.");
      toast.present(); 
    }
  }
  
  cadUsu(){
     this.navCtrl.push(CadUsuPage);
  }

}
