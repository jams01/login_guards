import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  constructor(private httpclient: HttpClient) { }

  getuserinfo(id: string){
    this.httpclient.get(environment.server+'users/'+id);
  }

  loginuser(user: any){
    return new Promise((resolve, reject)=>{
      this.httpclient.post(environment.server + 'login', user).subscribe((data)=>{
        resolve(data);
      });
    });
    
  }

  register(data: any){
    return new Promise((resolve, reject)=>{
      this.httpclient.post(environment.server + 'register',data).subscribe((data)=>{
        resolve(data);
      });
    });
    
  }
}
