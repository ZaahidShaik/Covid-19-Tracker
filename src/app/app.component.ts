import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from './services/auth-service/authenticator.service';
import { UserInfoServiceService } from './services/user-info-service/user-info-service.service';
import { userLoginModel } from './models/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'covid-app';

  userStatus: Boolean = false;

  userInfo: userLoginModel = this._user.clearUserInfo;

  NewUser: Boolean = false;

  constructor(private _auth: AuthenticatorService,
              private _user: UserInfoServiceService,){}
  
  ngOnInit(): void {
    this._auth.curentSignInState.subscribe(status => this.userStatus = status);
    this._user.currentUserInfo.subscribe(user => this.userInfo = user);
  }
    
  // isExistingUser(){
  //   this.NewUser != this.NewUser;
  // }

  SignOut(){
    this._user.signOutUser(this.userInfo);
  }
}
