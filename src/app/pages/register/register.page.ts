import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerform: FormGroup;
  constructor(private fb: FormBuilder, private alertController: AlertController, 
    private auth: AuthenticationService, private router: Router,
    private authf: AuthFirebaseService, private camera: CameraService) {
    this.registerform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]]
    });
   }

  ngOnInit() {
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  onSubmit(){
    if(this.registerform.value['password']!=this.registerform.value['password2']){
      this.presentAlert("Las contraseñas no coinciden");
      return;
    }
    this.camera.getfotoblob().then((foto:Blob)=>{
      this.authf.register(this.registerform.value, foto).then((val)=>{
        this.router.navigateByUrl('/tabs/tab1',{replaceUrl: true});
      }).catch(()=>{
        this.presentAlert("Error en el registro");
      });
    })
    
  }

  tomarfoto(){
    this.camera.tomarfoto();
  }

}
