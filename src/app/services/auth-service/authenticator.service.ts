import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { InputValidationService } from '../validation-service/input-validation.service';
import { BackendserviceService } from 'src/app/services/backend-serive/backendservice.service';
import { formUserLoginModel, formUserRegistrationModel, userRegistrationModel } from 'src/app/models/models';


export enum LoginStatus {
  LoggedIn,
  LoggedOut,
  Register,
  NotRegistered,
  CannotRegister,
  UserNameInUse,
}

export enum Operations {
  LogIn,
  Logout,
  Register
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private _valid: InputValidationService) { }

  private isSignedIn = new BehaviorSubject<boolean>(false);
  curentSignInState = this.isSignedIn.asObservable();


  UpdateSignInState(status: boolean){
    console.log(`changing status: ${status}`);
    
    this.isSignedIn.next(status);
  }

  getRegistrationValidated(signUpobj:formUserRegistrationModel ){
    return this.getAuthCheck(signUpobj.username, signUpobj.password,Operations.Register);
  }

  getLoginValidated(signUpobj:formUserLoginModel ){
    return this.getAuthCheck(signUpobj.username, signUpobj.password,Operations.LogIn);
  }
  
  isUsernameAuthetic(username: String){
    let legal: Boolean = this._valid.checkisValidUser(username);
    if(legal == false){
      return LoginStatus.Register;
    }
    else if(legal == true){
      return LoginStatus.UserNameInUse;
    };
    return LoginStatus.CannotRegister;

  }

  getAuthCheck(username: String, password: String, operation: Operations){
    console.log(`username:${username}, password: ${password}`);
    let validation;
    switch(operation){
      case Operations.Register:{
        validation = this.isUsernameAuthetic(username);
        break;
      }
      case Operations.LogIn:{
        break;
      }
      case Operations.Logout:{
        break;
      }
      default: {
        console.log("Failed: Not valid Operation..!");
        break;
      }

    }

    return validation;







    /**
     * ToDo: add logic to make http call to seriver and get the user
     *       credentials verified. 
     * ToDo Extension: Add token implemenation to have user security.
     * 
     **/



    // if(validation === LoginStatus.LoggedIn){
    //   console.log("logging In...!");
      
    //   this.UpdateSignInState(true);
    // }
    // else if(validation === LoginStatus.LoggedOut){
    //   console.log("logging out...!");
      
    //   this.UpdateSignInState(false);
    // }
   
  }







}
