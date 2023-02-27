import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform: FormGroup;
  loading: HTMLIonLoadingElement| null = null;
  constructor(private fb: FormBuilder, private loadingController: LoadingController,
    private auth: AuthenticationService, private router: Router, private toastController: ToastController) {
    this.loginform = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
   }

  ngOnInit() {
    this.presentLoading("cargando");
    setTimeout(()=>{
      this.loading?.dismiss();
    }, 1000);
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
      spinner: 'bubbles'
    });
    await this.loading.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  async onSubmit(){
    this.presentLoading("Loguendo...");
    setTimeout(()=>{
      this.auth.login(this.loginform.value).then((val)=>{
        this.loading?.dismiss();
        this.router.navigateByUrl('/tabs',{replaceUrl: true});
      }).catch(()=>{
        this.loading?.dismiss();
        this.presentToast("Error en sus credenciales", "danger");
      });
    },80);
    
  }

}
