import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovAgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovAgendaProvider {
  public url: any;

  constructor(public http: Http) {
    console.log('Hello MovAgendaProvider Provider');
  }


  criarMovAgenda(movAgenda) {
    console.log("Movto Agenda Promise: " + JSON.stringify(movAgenda));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      
      this.http.post('http://localhost:3000/mov_agenda', JSON.stringify(movAgenda), { headers: headers })
           .subscribe(result => {
            resolve(result.json());
      },
      (error) => {
            reject(error.json());
      })       
    });     
   };


   removerMovAgenda(mov_id){
 
    console.log('ParamProv Mov Agenda Del: ' + mov_id)
    
    this.url = 'http://localhost:3000/mov_agenda/' + mov_id
    this.http.delete(this.url).subscribe((res) => {
      console.log(res.json());
    });   
 
  }

}
