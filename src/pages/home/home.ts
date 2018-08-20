import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { ProfissionalProvider } from '../../providers/profissional/profissional';
import { DatasPage} from '../datas/datas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public usunameHome: string;
  public usuidHome: string;
  public idProfHome: string;
  public nomeProfHome: string;
  public descProfHome: string; 
  prof: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private usuProvider: UsuarioProvider,
              private profProvider: ProfissionalProvider) {
              this.usunameHome = this.usuProvider.nomeGlobal
              this.usuidHome = this.usuProvider.idGlobal
              this.nomeProfHome = this.profProvider.nomeProfGlobal
              this.descProfHome = this.profProvider.descProfGlobal
              this.idProfHome = this.profProvider.idProfGlobal
              console.log("Global Home: " + this.usunameHome + " / " + this.usuidHome)
              console.log("Home: " + this.navParams.data.profId)
              if (this.navParams.data.profId) {
                this.exibirDatas(this.navParams.data.profId);
              }

  }

  ionViewDidLoad(){
 
    this.profProvider.getProfissionais().then((data) => {
      console.log(data);
      this.prof = data;
    });
 
  }

  exibirDatas(profd) {
    console.log("Home id: " + profd.id);
    this.profProvider.nomeProfGlobal = profd.Nome;
    this.profProvider.descProfGlobal = profd.Descricao;
    this.profProvider.idProfGlobal = profd.id;
    this.nomeProfHome = this.profProvider.nomeProfGlobal
    this.descProfHome = this.profProvider.descProfGlobal
    this.idProfHome = this.profProvider.idProfGlobal
    console.log("Home Nome/Desc: " + this.nomeProfHome + this.descProfHome + this.idProfHome);
    this.navCtrl.push(DatasPage, {profId: profd.id});  
  }

}

