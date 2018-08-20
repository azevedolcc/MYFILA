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
  public diaSemana: string;
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
              console.log("Param 2: " + this.dataSelec + ' / ' + this.idProfHome + ' / ' + this.usuIdHome)
              
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasDispPage' + " => " + this.navParams.data.profIdParam + ' ' + this.idProfHome
                + ' ' + this.agendaProvider.dataAgendaGlobal);

    this.dataSelec = new Date(this.agendaProvider.dataAgendaGlobal);
    //var dia_sem = this.dataSelec.getDay();
    console.log('Display: ' + this.dataSelec + ' ' + this.navParams.data.profIdParam)

    let semana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
    //this.dataSelec = (this.dataSelec.substring(0, 10));
    //let dataString  = (this.dataSelec.substring(0, 10)).split("-");
    //let datast = new Date(dataString[0], (dataString[1]-1), dataString[2]);
    this.dataSelec.setDate(this.dataSelec.getDate() + 1);
    this.diaSemana = semana[this.dataSelec.getDay()]; 
    console.log('Dia semana: ' + this.dataSelec + this.diaSemana)

    if (this.navParams.data.profIdParam) {
      this.getHoras(this.navParams.data.profIdParam);
    }
  }

  private getHoras(idProf) {
    console.log("Horas-disp: " + idProf)
    this.agendaProvider.getHorasAgenda(idProf).then((data) => {
      console.log(data)
      this.horas = data;
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

    let toast = this.toastCtrl.create({duration: 3000, position: 'botton'});

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
