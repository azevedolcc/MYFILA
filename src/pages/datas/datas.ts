import { HorasDispPage } from './../horas-disp/horas-disp';
import { Component } from '@angular/core';
import { AgendaProvider } from './../../providers/agenda/agenda';
import { ProfissionalProvider } from './../../providers/profissional/profissional';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-datas',
  templateUrl: 'datas.html',
})
export class DatasPage {

  public nomeProfHome: string;
  public descProfHome: string; 
  public profIdParam: string;
  
  
  datas: any;

  idProf: any;
  dataSelec: any;
  diaSem: any;
  dia_sem: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public agendaProvider: AgendaProvider,
              public profProvider: ProfissionalProvider) {
              this.nomeProfHome = this.profProvider.nomeProfGlobal
              this.descProfHome = this.profProvider.descProfGlobal
              this.profIdParam = this.navParams.data.profId
              console.log("Param 1: " + this.navParams.data.profId + this.nomeProfHome )
              if (this.navParams.data.profId) {
                this.getDatas(this.navParams.data.profId);
              }
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatasPage');
     
    var datah = new Date();

    // Guarda cada pedaço em uma variável
    var dia     = datah.getDate();           // 1-31
    //var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes     = datah.getMonth();          // 0-11 (zero=janeiro)
    var ano4    = datah.getFullYear();       // 4 dígitosdia
    var hora    = datah.getHours();          // 0-23
    var min     = datah.getMinutes();        // 0-59
    var seg     = datah.getSeconds();        // 0-59
    var mseg    = datah.getMilliseconds();   // 0-999
  
  }

  private getDatas(id: string) {
    this.agendaProvider.getDatasAgenda(id).then((data) => {
      console.log(data);
      this.datas = data;
      let semana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
      for(var i=0, len = this.datas.length; i < len; i++) {
        this.datas[i].diaSem = semana[this.datas[i].diasemana]; 
        console.log(this.datas[i].diaSem);
     }
    });
  }

  exibirHoras(profIdParam, datadisp, diasemana, diasem) {
    console.log("Data Selec: " + datadisp + " / " + profIdParam + " / " + diasemana + " / " + diasem )
    this.agendaProvider.dataAgendaGlobal = datadisp
    this.navCtrl.push(HorasDispPage, {profIdParam, datadisp, diasemana, diasem}); }
}
