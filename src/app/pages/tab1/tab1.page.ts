import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private auth: AuthenticationService, private router: Router, public camera: CameraService,
    private authf: AuthFirebaseService) {}

  logout(){
    this.authf.logout().then(()=>{
      this.router.navigateByUrl('', {replaceUrl: true});
    });
    
  }

  tomarfoto(){
    this.camera.tomarfoto();
  }

}
