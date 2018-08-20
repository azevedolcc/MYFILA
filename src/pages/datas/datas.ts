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
    });
  }

  exibirHoras(profIdParam, datadisp) {
    datadisp = (datadisp.substring(0, 10));
    console.log("Datadisp: " + datadisp)
    let dataString  = (datadisp.substring(0, 10)).split("-");
    console.log("DataStr: " + dataString)
      /* Define a data com os valores separados */
    let datast = new Date(dataString[0], (dataString[1]-1), dataString[2]);
    console.log(dataString[0] + ' ' +  (dataString[1]-1) + ' ' + dataString[2]);
    console.log( "Ver 0: " + datast );
    console.log( "Ver 1: " + datast.toString() );
    console.log( "Ver 2: " + datast.toLocaleDateString("pt-BR") );
    this.dia_sem = datast.getDay();
    console.log("Data Selec: " + datadisp + " / " + profIdParam + " / " + this.dia_sem)
    let dadosPesq = {
      idProf: this.profIdParam,
      dataSelec: datadisp,
      diaSem: this.dia_sem
    };
    this.agendaProvider.dataAgendaGlobal = datadisp
    this.navCtrl.push(HorasDispPage, {profIdParam}); }
}
