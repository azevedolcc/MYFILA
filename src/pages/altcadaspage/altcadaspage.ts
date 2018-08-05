import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'altcadaspage',
  templateUrl: 'altcadaspage.html',
})
export class AltCadasPage {

  public usuid: any;
  public usuname: string;
  public usudatnasc: string;
  public usuemail: string;  
  public usuemailconf: string;
  public usupassword: string;  
  public usutelefone: string;
  
  usuario: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private usuProvider: UsuarioProvider) {
              let toast = this.toastCtrl.create({duration: 3000, position: 'middle'});
              this.usuemail = this.usuProvider.emailGobal
              this.usuProvider.getEmail(this.usuemail)
              .then((data) => {
                  this.usuario = data
                  this.usuid = this.usuario[0].id
                  this.usuname = this.usuario[0].nome
                  this.usudatnasc = this.usuario[0].data_nasc
                  this.usuemailconf = this.usuario[0].email
                  this.usupassword = this.usuario[0].password
                  this.usutelefone = this.usuario[0].telefone
              })
              .catch((error: any) => {
                       toast.setMessage("Não foi encontrado usuário com login " + this.usuemail);
                       toast.present();          
              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltCadasPage');
  }


  salvaAltCadas() {

    let toast = this.toastCtrl.create({duration: 3000, position: 'middle'});

    if (this.usuname !== null && this.usudatnasc !== null && this.usuemail !== null && this.usutelefone !== null) {
      if (this.usuemail == this.usuemailconf) {
        let review = {
          id: this.usuid,
          nome: this.usuname,
          email: this.usuemail,
          data_nasc: this.usudatnasc,
          password: this.usupassword, 
          telefone: this.usutelefone
        };

        this.usuProvider.alterarSenha(review)
        .then((result: any) => {
          this.usuProvider.nomeGobal = this.usuname
          toast.setMessage("Cadastro Alterado com sucesso.");
          toast.present();          
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          toast.setMessage("Erro no cadastramento do usuário.");
          toast.present();     
        })
      } else {
        toast.setMessage("Email diferentes, favor digitar novamente.");
        toast.present(); 
      }
    }
  }
}
