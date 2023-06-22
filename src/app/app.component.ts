import { Component, OnInit } from '@angular/core';
import { AuthenticatorService, LoginStatus } from './userlogin/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'covid-app';

  userStatus: Boolean = false;

  NewUser: Boolean = false;

  constructor(private _auth: AuthenticatorService){}
  
  ngOnInit(): void {
    this._auth.curentSignInState.subscribe(status => this.userStatus = status);
  }
    
  isExistingUser(){
    this.NewUser != this.NewUser;
  }

  SignOut(){
    this._auth.getAuthCheck("","", LoginStatus.LoggedOut);
  }
}
