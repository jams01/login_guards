import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usuario: User;
  USER_KEY='user';
  LOGIN_KEY = 'login';
  autenticado: BehaviorSubject<boolean| null> = new BehaviorSubject<boolean|null>(null);
  constructor() {
    this.usuario = new User;
    this.init();
  }

  async init(){
    Preferences.get({key: this.USER_KEY}).then((data)=>{

      if(data.value){
        this.usuario = JSON.parse(data.value);
        console.log(this.usuario);
      }
    });
    Preferences.get({key: this.LOGIN_KEY}).then((data)=>{
      if(data.value){
        this.usuario = JSON.parse(data.value);
        this.autenticado.next(true);
      }else{
        this.autenticado.next(false);
      }
      
    });
  }

  register(data: User){
    return new Promise((resolve, reject)=>{
      this.usuario = data;
    Preferences.set({
      key: this.USER_KEY,
      value: JSON.stringify(data)
    }).then(()=>{
      resolve(true);
      console.log(data);
    }).catch(()=>{
      reject(false);
    });
    });
    
  }

  login(data: any){
    return new Promise((resolve, reject)=>{
      if(this.usuario.email == data.email && this.usuario.password == data.password){
        Preferences.set({key: this.LOGIN_KEY, value: JSON.stringify(this.usuario)}).then(()=>{
          this.autenticado.next(true);
          resolve(true);
        });
      }else{
        this.autenticado.next(false);
        reject(false);
      }
    });
  }

  logout(){
    this.autenticado.next(false);
    Preferences.remove({key: this.LOGIN_KEY});
  }
}
