import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AcessoPage } from '../../pages/acessopage/acessopage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadUsuPage');
  }

  CadUsu(){
    console.log("===>" + this.usuname + " " + this.usudatnasc + " " + this.usuemail + " " + this.usuemailconf + " " + this.usupassword + " " + this.usupasswordconf)
    this.navCtrl.push(AcessoPage);    
  }

}
