import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private auth: AuthenticationService, private router: Router) {}

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('', {replaceUrl: true});
  }

}
