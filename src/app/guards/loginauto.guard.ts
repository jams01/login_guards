import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginautoGuard implements CanLoad {
  constructor(private auth: AuthenticationService, private router: Router){

  }
  canLoad( route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree > | Promise<boolean | UrlTree> | boolean | UrlTree  {
    return this.auth.autenticado.pipe(
      filter((val) => val !== null),
      take(1),
      map((autenticado)=>{
        if(!autenticado){
          return true;
        }else{
          this.router.navigateByUrl('/tabs');
          return false;
        }
      })
    );
  }
}
