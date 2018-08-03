//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ReplaySubject } from 'rx';
import { resolve } from 'dns';


/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  public data: any;
  public url: any;
  public result: any;
  public usuNCad: boolean;

  constructor(public http: Http) {
    console.log('Hello UsuarioProvider Provider');
  }

  getEmail(email: string) {
    
      console.log('Antes do GET ' + email)
      this.url = 'http://localhost:3000/usuario_email/' + email
      console.log('url ' + this.url)

      this.http.get(this.url)
        .subscribe(res => {
          this.data = res.json();
          console.log("Prov1: " + res.json());
          console.log("Prov2: " + this.data.status);
      },
      error => {
        console.log('Prov OK: ' + error.ok);
        console.log('Prov ST: ' + error.status);
        console.log('Prov ER: ' + error);
      }
      );
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
 
  }

  /*createUsuario(review) {
 
    console.log("Review: " + JSON.stringify(review));

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
      this.http.post('http://localhost:3000/usuario', JSON.stringify(review), { headers: headers })
        .subscribe(res => {
          //resolve(res.json());
        console.log(res.json());
      },
      (error) => {
        //reject(error.json());
        console.log(error.ok);
        console.log(error.status);
        console.log(error);
        if (error.ok = false) {
          this.usuNCad = true
        }
        console.log("usuNCad: " + this.usuNCad);
        return this.usuNCad;
      }
      );
 
  }*/


  loginUsuario(email: string, password: string) {
    console.log("Login email: " + email + " Passw: " + password)
    return new Promise((resolve, reject) => {
   
      var data ={
        email: email,
        password: password
      };

      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      this.http.post('http://localhost:3000/usuario', JSON.stringify(data), { headers: headers })
          .subscribe(result => {
          resolve(result.json());
      },
      (error) => {
         reject(error.json());
      })       
    });     
  }
}  
