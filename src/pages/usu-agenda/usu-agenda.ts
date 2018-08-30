import { MovAgendaProvider } from './../../providers/mov-agenda/mov-agenda';
import { HomePage } from './../home/home';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-usu-agenda',
  templateUrl: 'usu-agenda.html',
})
export class UsuAgendaPage {

  public usuName: string;
  public usuId: string;
  totagenda: any;
  agendas: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuProvider: UsuarioProvider,
              public movAgProvider: MovAgendaProvider,
              public toastCtrl: ToastController) {
              this.usuName = this.usuProvider.nomeGlobal
              this.usuId = this.usuProvider.idGlobal
              this.usuProvider.getTotalAgenda(this.usuId).then((data) => {
                console.log(data);
                this.totagenda = data;
              });
              this.usuProvider.getAgenda(this.usuId).then((data) => {
                console.log(data);
                this.agendas = data;
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuAgendaPage ' + this.usuId);
    this.usuProvider.getTotalAgenda(this.usuId).then((data) => {
      console.log(data);
      this.totagenda = data;
      if (data != 0) {
        console.log("Existe agenda para este usuário.")
      } else {
        console.log("Não Existe agenda para este usuário.")
        let toast = this.toastCtrl.create({duration: 2000, position: 'middle'});
        toast.setMessage("Este usuário não possui agendamentos.");
        toast.present();   
        this.navCtrl.setRoot(HomePage)
      }
    });
    this.usuProvider.getAgenda(this.usuId).then((data) => {
      console.log(data);
      this.agendas = data;
    });   
  }
  removerAgenda(agenda) {
    console.log('Remover Agenda');
      
    let toast = this.toastCtrl.create({duration: 1500, position: 'middle'});

    if(agenda.mov_id) {
      this.movAgProvider.removerMovAgenda(agenda.mov_id)
      toast.setMessage("Horário excluído com sucesso.");
      toast.present();          
      this.navCtrl.setRoot(UsuAgendaPage)
    } else {
      toast.setMessage("Erro na exclusão do horário.");
      toast.present(); 
    }  
  }

}
