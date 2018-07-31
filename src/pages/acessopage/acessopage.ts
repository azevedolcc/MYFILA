import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CadUsuPage } from '../../pages/cadusupage/cadusupage';

@IonicPage()
@Component({
  selector: 'acessopage',
  templateUrl: 'acessopage.html',
})
export class AcessoPage {

  public usuemail: string;  
  public usupassword: string;  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public menu: MenuController) {

              this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcessoPage');
  }

  acessar(){
    console.log( "===>" + this.usuemail + "->" + this.usupassword);
    this.navCtrl.setRoot(HomePage);
  } 

  cadusu(){
    this.navCtrl.push(CadUsuPage);
  }

}
