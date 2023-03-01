import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { ApiserviceService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usuario: User;
  USER_KEY='user';
  token: string="";
  LOGIN_KEY = 'login';
  autenticado: BehaviorSubject<boolean| null> = new BehaviorSubject<boolean|null>(null);
  constructor(private api: ApiserviceService) {
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
        this.token = JSON.parse(data.value);
        this.autenticado.next(true);
      }else{
        this.autenticado.next(false);
      }
      
    });
  }

  register(data: User){
    return new Promise((resolve, reject)=>{
      this.api.register(data).then((data:any)=>{
        this.autenticado.next(true);
        Preferences.set({key: this.LOGIN_KEY, value: JSON.stringify(data.token)});
        resolve(data);
      });
    });
    
  }

  login(data: any){
    return new Promise((resolve, reject)=>{
      this.api.loginuser(data).then((data: any)=>{
        this.autenticado.next(true);
        Preferences.set({key: this.LOGIN_KEY, value: JSON.stringify(data.token)});
        resolve(data);
      });
      
    });
  }

  logout(){
    this.autenticado.next(false);
    Preferences.remove({key: this.LOGIN_KEY});
  }
}
