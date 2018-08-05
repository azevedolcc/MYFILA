import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'altsenpage',
  templateUrl: 'altsenpage.html',
})
export class AltSenPage {

  public usuname: string;
  public usuemail: string;  

  public usupasswordatu: string;  
  public usupasswordnova: string;  
  public usupasswordconf: string;

  usuario: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private usuProvider: UsuarioProvider) {
              this.usuname = this.usuProvider.nomeGobal
              this.usuemail = this.usuProvider.emailGobal
              console.log("Gobal Altsenha: " + this.usuname + " " + this.usuemail)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltSenPage');
  }

  AltSenha(){ 

    let toast = this.toastCtrl.create({duration: 3000, position: 'middle'});

    if (this.usupasswordatu !== null && this.usupasswordnova !== null && this.usupasswordconf) {
      if (this.usupasswordnova == this.usupasswordconf) {
          this.usuProvider.getEmail(this.usuemail)
          .then((data) => {
              this.usuario = data
              if (this.usupasswordatu !== this.usuario[0].password) {
                    toast.setMessage("Senha atual invalida. Verifique a senha e tente novamente.");
                    toast.present(); 
              } else {

                    let review = {
                      id: this.usuario[0].id,
                      nome: this.usuario[0].nome,
                      email: this.usuario[0].email,
                      data_nasc: this.usuario[0].data_nasc,
                      password: this.usupasswordnova, 
                      telefone: this.usuario[0].telefone
                    };

                    this.usuProvider.alterarSenha(review)
                    .then((result: any) => {
                      toast.setMessage("Senha Alterada com sucesso.");
                      toast.present();          
                      this.navCtrl.setRoot(HomePage);
                    })
                    .catch((error: any) => {
                      toast.setMessage("Erro no cadastramento do usuário.");
                      toast.present();     
                    })
              }       
          })
          .catch((error: any) => {
                   toast.setMessage("Não foi encontrado usuário com login " + this.usuemail);
                   toast.present();          
          })
      } else {
        toast.setMessage("Passwords Diferentes, favor digitar novamente.");
        toast.present(); 
      }
    }
  }
}
