//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioProvider {

  public data: any;
  public url: any;
  public usuNCad: boolean;

  constructor(public http: Http) {
    console.log('Hello UsuarioProvider Provider');
  }

  getEmail(email: string) {
    
    /*return new Promise((resolve, reject) => {
      this.url = 'http://localhost:3000/usuario_email/' + email
      this.http.get(this.url)
           .subscribe(result => {
            resolve(result.json());
      },
      (error) => {
            reject(error.json());
      })       
    }); */
    
    return new Promise((resolve, reject)  => {
      this.url = 'http://localhost:3000/usuario_email/' + email
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          //console.log('Data prov email: ' + this.data)
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
