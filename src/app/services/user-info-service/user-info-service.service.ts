import { Injectable } from '@angular/core';
import { userLoginModel, userRegistrationModel } from 'src/app/models/models';
import { BackendserviceService } from '../backend-serive/backendservice.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthenticatorService } from '../auth-service/authenticator.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserInfoServiceService {

  clearUserInfo: userLoginModel = {
    userName: '',
    password: ''
  }

  private UserInfo = new BehaviorSubject<userLoginModel>(this.clearUserInfo);
  currentUserInfo = this.UserInfo.asObservable();
  


  UpdateUserInfo( newUserInfo: userLoginModel){
    console.log(`Updating User Info: ${newUserInfo}`);    
    this.UserInfo.next(newUserInfo);
  }

  constructor(private _callSerivce: BackendserviceService, 
              private _auth: AuthenticatorService,
              private _router: Router,) { }

  registerUserData(signInformData :userRegistrationModel){
    console.log("sending data to backedn:");
    console.log(signInformData);
    
    
    this._callSerivce.saveRegisteredUser(signInformData).subscribe((results: userRegistrationModel) => {
      console.log("RegisterResult: ");
      console.log(results); 
    })
  }

  signInUser(loginUserCredentials: userLoginModel){
    console.log("sending User Data to backedn to Login:");
    console.log(loginUserCredentials);
    
    this._callSerivce.getUserloggedIn(loginUserCredentials).subscribe((results: String) => {
      console.log("RegisterResult: ");
      console.log(results); 
      this.CheckReponseStatus(results, loginUserCredentials)
    })

  }

  signOutUser(loginUserCredentials: userLoginModel){
    console.log("sending User Data to backedn to LogOut:");
    console.log(loginUserCredentials);
    
    this._callSerivce.getUserloggedOut(loginUserCredentials).subscribe((results: String) => {
      console.log("RegisterResult: ");
      console.log(results); 
      this.CheckReponseStatus(results, loginUserCredentials)
    })
  }

  CheckReponseStatus(reponse: String, UserCredentials: userLoginModel ){
    if(reponse == 'USER_SIGNED_IN')
    {
      // Good case USer Login
      this.UpdateUserInfo(UserCredentials);
      this._auth.UpdateSignInState(true);
      this._router.navigateByUrl('/app-homepage');
    }
    else if(reponse == 'USER_SIGNED_OUT')
    {
      // Good case User logout
      this.UpdateUserInfo(this.clearUserInfo);
      this._auth.UpdateSignInState(false);

    } 
    else if ( reponse == 'USER_NOT_FOUND')
    {
      // TO-DO: Wrong User Input Try Again with different inputs.
      console.log('Wrong User Input Try Again with different inputs');
      
    } 
    else if (reponse == 'USER_FOUND_UNABLE_TO_SIGN_IN')
    {
      // TO-DO: Can't Sign IN
      console.log('Not A User to LogIN');

    }
    else if (reponse == 'USER_FOUND_UNABLE_TO_SIGN_OUT')
    {
      // TO-DO: Can't Sign OUT
      console.log('Not A User to LogOUT');

  }
}


}
