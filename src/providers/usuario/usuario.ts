//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioProvider {

  public nomeGlobal: string;
  public emailGlobal: string;
  public idGlobal: string;
  
  public data: any;
  public url: any;

  constructor(public http: Http) {
    console.log('Hello UsuarioProvider Provider');
  }

  getEmail(email: string) {
    
    return new Promise((resolve, reject)  => {
      this.url = 'http://localhost:3000/usuario_email/' + email
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, 
        (error) => {
          reject(error.json());
        }    
        );
    });

  };

  createUsuario(review) {
    console.log("Review Promise: " + JSON.stringify(review));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      
      this.http.post('http://localhost:3000/usuario', JSON.stringify(review), { headers: headers })
           .subscribe(result => {
            resolve(result.json());
      },
      (error) => {
            reject(error.json());
      })       
    });     
   };

   alterarSenha(review) {
    console.log("Review Metodo put: " + JSON.stringify(review));
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      this.url = 'http://localhost:3000/usuario/' + review.id
      this.http.put( this.url, JSON.stringify(review), { headers: headers })
           .subscribe(result => {
            resolve(result.json());
      },
      (error) => {
            reject(error.json());
      })       
    });     
   };

   getTotalAgenda(id: string) {
 
    return new Promise (resolve => {
      console.log('Antes do GET Total Agenda do usuário => ' + id)
      this.url = 'http://localhost:3000/usuario_agenda1/' + id
      console.log('URL: ' + this.url)
      this.http.get(this.url)
        .map(res => res.json()) 
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getAgenda(id: string) {
 
    return new Promise (resolve => {
      console.log('Antes do GET Agenda do usuário => ' + id )
      this.url = 'http://localhost:3000/usuario_agenda2/' + id
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
