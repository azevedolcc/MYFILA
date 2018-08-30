import { DatasPage } from './../datas/datas';
import { HomePage } from './../home/home';
import { MovAgendaProvider } from './../../providers/mov-agenda/mov-agenda';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { ProfissionalProvider } from './../../providers/profissional/profissional';
import { Component } from '@angular/core';
import { AgendaProvider } from './../../providers/agenda/agenda';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-horas-disp',
  templateUrl: 'horas-disp.html',
})
export class HorasDispPage {

  public usuIdHome: string;
  public idProfHome: string;
  public nomeProfHome: string;
  public descProfHome: string; 
  public dataSelec: Date;
  public horaSelec: string;
  public descDiaSem: string;
  horas: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public usuProvider: UsuarioProvider,
              public agendaProvider: AgendaProvider,
              public profProvider: ProfissionalProvider,
              public movAgendaProvider: MovAgendaProvider) {
              this.nomeProfHome = this.profProvider.nomeProfGlobal
              this.descProfHome = this.profProvider.descProfGlobal
              this.idProfHome = this.profProvider.idProfGlobal
              this.usuIdHome = this.usuProvider.idGlobal
              this.dataSelec = new Date(this.agendaProvider.dataAgendaGlobal)
              console.log("Param 2: " + this.dataSelec + ' / ' + this.idProfHome + ' / ' + this.usuIdHome
                           + ' ' + this.navParams.data.diasemana
                           + ' ' + this.navParams.data.diasem )
              this.descDiaSem = this.navParams.data.diasem 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasDispPage' + " => " 
                 + this.navParams.data.profIdParam + ' ' + this.idProfHome
                 + ' ' + this.agendaProvider.dataAgendaGlobal
                 + ' ' + this.navParams.data.datadisp
                 + ' ' + this.navParams.data.diasemana
                 + ' ' + this.navParams.data.diasem);

    this.descDiaSem = this.navParams.data.diasem                 
   
    if (this.navParams.data.profIdParam) {
      this.getHoras(this.navParams.data.profIdParam);
    }
  }

  public getHoras(idProf) {
    
    let dados = { dataSelec: this.navParams.data.datadisp,
                  idProfSelec: this.navParams.data.profIdParam,
                  diaSemSel: this.navParams.data.diasemana
    };
    console.log('getHorasAgenda - HD =>' 
                 + ' ' + this.navParams.data.profIdParam + ' ' + this.navParams.data.datadisp
                 + ' ' + this.navParams.data.diasemana + ' ' + this.navParams.data.diasem + ' ' + dados);
    this.agendaProvider.getHorasAgenda(dados).then((data) => {
      console.log(data)
      this.horas = data;
      console.log("HD : " + data + ' ' + this.horas.length) 
      if (this.horas.length == 0) {
        let toast = this.toastCtrl.create({duration: 2000, position: 'middle'})
        toast.setMessage("Não existe horário disponível para esta data.");
        toast.present();          
        this.navCtrl.setRoot(DatasPage, {profId: idProf});  
      };
    });
  }

  marcarHora(idProf, horaSelec) {
    console.log("Marcar Hora: " + idProf + ' ' + horaSelec + ' ' + this.dataSelec + ' ' + this.usuIdHome)
    let movAgenda = {
        dataSelec: this.dataSelec,
        idProfSelec: idProf,
        horaAtend: horaSelec,
        idUsuSelec: this.usuIdHome
    };

    let toast = this.toastCtrl.create({duration: 2000, position: 'middle'});

    if(movAgenda) {
        this.movAgendaProvider.criarMovAgenda(movAgenda)
        .then((result: any) => {
          toast.setMessage("Horário agendado com sucesso.");
          toast.present();          
          this.navCtrl.setRoot(HomePage);
        })
        .catch((error: any) => {
          toast.setMessage("Erro no agendamento do horário.");
          toast.present();     
        })
    } else {
        toast.setMessage("Erro no agendamento do horário..");
        toast.present(); 
    }  
  }

}
