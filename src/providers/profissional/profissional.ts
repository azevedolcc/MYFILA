import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the ProfissionalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfissionalProvider {

  public nomeProfGlobal: string;
  public descProfGlobal: string;
  public idProfGlobal: string;

  data: any;
  url: any;

  constructor(public http: Http) {
    this.data = null;
    console.log('Hello ProfissionalProvider Provider');
  }

  getProfissionais() {
 
    //if (this.data) {
    //  return Promise.resolve(this.data);
    //}
  
    return new Promise (resolve => {
      console.log('Antes do GET Profissional geral ')
      this.url = 'http://localhost:3000/profissional' 
      console.log('URL: ' + this.url)
      this.http.get(this.url)
        .map(res => res.json()) 
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
