import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { AcessoPage } from '../../pages/acessopage/acessopage';
import * as moment from 'moment';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'cadusupage',
  templateUrl: 'cadusupage.html',
})
export class CadUsuPage {

  public usuname: string;
  public usudatnasc: string;
  public usuemail: string;  
  public usuemailconf: string;  
  public usupassword: string;  
  public usupasswordconf: string;  
  public usutelefone: string;
  public maxDate: string;
  public emailIgual: boolean;
  public passwIgual: boolean;
  public retorno : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private usuProvider: UsuarioProvider,
              public toastCtrl: ToastController) {
                this.maxDate = moment().subtract(2, 'years').format();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadUsuPage');
  }

  salvaUsu() {
 
    let review = {
      nome: this.usuname,
      email: this.usuemail,
      data_nasc: this.usudatnasc,
      password: this.usupassword,
      telefone: this.usutelefone
    };

    let toast = this.toastCtrl.create({duration: 3000, position: 'middle'});
    console.log(this.usuemail + ' ' + this.usuemailconf);
    this.passwIgual = true;
    if (this.usupassword !== this.usupasswordconf) {
         this.passwIgual = false;
    };
 
    this.emailIgual = true;
    if (this.usuemail !== this.usuemailconf) {
         this.emailIgual = false;
    };
      
    if (!this.emailIgual) {     
         console.log("Emails diferentes, favor digitar novamente ");
         toast.setMessage("Emails Diferentes, favor digitar novamente.");
         toast.present(); 
    } 

    if (!this.passwIgual) {     
      console.log("Passwords diferentes, favor digitar novamente ");
      toast.setMessage("Passwords Diferentes, favor digitar novamente.");
      toast.present(); 
    } 
    if (!this.emailIgual && !this.passwIgual) {     
      console.log("Emails e Passwords diferentes, favor digitar novamente ");
      toast.setMessage("Emails e Passwords Diferentes, favor digitar novamente.");
      toast.present(); 
    } 
    if (this.emailIgual && this.passwIgual) {     
        if(review) {
             this.usuProvider.getEmail(review.email)
             .then((result: any) => {
                  if (result.length != 0) {
                      toast.setMessage("Email já cadastrado em outroxxx usuario.");
                      toast.present();
                  } else {
                    console.log(result.length)
                    this.usuProvider.createUsuario(review)
                    .then((result: any) => {
                      toast.setMessage("Usuário cadastrado com sucesso.");
                      toast.present();          
                      this.navCtrl.push(AcessoPage); 
                    })
                    .catch((error: any) => {
                      toast.setMessage("Erro no cadastramento do usuário.");
                      toast.present();     
                    })
                  }
            })
            .catch((error: any) => {
                  this.usuProvider.createUsuario(review)
                  .then((result: any) => {
                    toast.setMessage("Usuário cadastrado com sucesso.");
                    toast.present();          
                    this.navCtrl.push(AcessoPage); 
                  })
                  .catch((error: any) => {
                    toast.setMessage("Erro no cadastramento do usuário.");
                    toast.present();     
                  })
            })
          } 
    }
  }
}
