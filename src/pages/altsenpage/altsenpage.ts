import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AcessoPage } from '../../pages/acessopage/acessopage';

@IonicPage()
@Component({
  selector: 'altsenpage',
  templateUrl: 'altsenpage.html',
})
export class AltSenPage {

  public usuname: string;  
  public usupassword: string;  
  public usupasswordconf: string;  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AltSenPage');
  }

  AltSenha(){ 
    console.log("===>" + this.usuname + " " + this.usupassword + " " + this.usupasswordconf)
    this.navCtrl.push(AcessoPage);    
  }

}
