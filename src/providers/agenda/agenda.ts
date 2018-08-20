import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


/*
  Generated class for the AgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendaProvider {

  public dataAgendaGlobal: string;

  data: any;
  url: any
  constructor(public http: Http) {
    this.data = null;
    console.log('Hello AgendaProvider Provider');
  }

  getDatasAgenda(id: any) {
 
    return new Promise(resolve => {
      console.log('Antes do GET Agenda geral ')
      this.url = 'http://localhost:3000/agenda/' + id 
      console.log('URL Agenda: ' + this.url)
      this.http.get(this.url)
        .map(res => res.json()) 
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getHorasAgenda(idProf) {
 
    return new Promise(resolve => {
      console.log('Antes do GET Horas Agenda ')
      this.url = 'http://localhost:3000/agenda_horas/' + idProf 
      console.log('URL Agenda Horas: ' + this.url)
      this.http.get(this.url)
        .map(res => res.json()) 
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
