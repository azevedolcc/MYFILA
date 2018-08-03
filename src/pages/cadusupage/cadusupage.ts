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
  public emailDif: boolean;
  public passwDif: boolean;

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
    this.passwDif = false;
    if (this.usupassword !== this.usupasswordconf) {
         this.passwDif = true;
    };
 
    this.emailDif = false;
    if (this.usuemail !== this.usuemailconf) {
         this.emailDif = true;
    };
      
    if (this.emailDif && this.passwDif) {     
      console.log("Emails e Passwords diferentes, favor digitar novamente ");
      toast.setMessage("Emails e Passwords Diferentes, favor digitar novamente.");
      toast.present(); 
    } 
    if (this.emailDif) {     
         console.log("Emails diferentes, favor digitar novamente ");
         toast.setMessage("Emails Diferentes, favor digitar novamente.");
         toast.present(); 
    } 

    if (this.passwDif) {     
      console.log("Passwords diferentes, favor digitar novamente ");
      toast.setMessage("Passwords Diferentes, favor digitar novamente.");
      toast.present(); 
    } 
    
    this.viewCtrl.dismiss(review);
    this.navCtrl.push(AcessoPage); 
    
    //var resposta = this.usuProvider.getEmail(review.email);
    //c//onsole.log(typeof resposta == "undefined")
    //console.log(typeof resposta === "undefined")
    //console.log(typeof resposta !== "undefined")
    
    /*let promiseEmail: Promise<any>;
    promiseEmail =  this.usuProvider.getEmail(this.usuemail)
    Promise.all ([promiseEmail])
      .then(() => {
        // this.emailExiste = true;
         console.log("Retornei do provider 1 ");
         toast.setMessage("Email já cadastrado");
         toast.present(); 
      }) .catch(() => {
         console.log("Cadastrando usuário ");
         console.log("Retornei do provider 2 ");
         toast.setMessage("Cadastrando Usuário");
         toast.present(); 
         this.viewCtrl.dismiss(review);
         this.navCtrl.push(AcessoPage); 
    })*/
  }
}
