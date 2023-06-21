import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export enum LoginStatus {
  LoggedIn,
  LoggedOut,
  NotRegisteres,
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor() { }

  private isSignedIn = new BehaviorSubject<boolean>(false);
  curentSignInState = this.isSignedIn.asObservable();


  UpdateSignInState(status: boolean){
    console.log(`changing status: ${status}`);
    
    this.isSignedIn.next(status);
  }

  getAuthCheck(username: string, password: string, status: LoginStatus ){
    console.log(`username:${username}, password: ${password}, status: ${status}`);
    let validation = status;

    if(validation === LoginStatus.LoggedIn){
      console.log("logging In...!");
      
      this.UpdateSignInState(true);
    }
    else if(validation === LoginStatus.LoggedOut){
      console.log("logging out...!");
      
      this.UpdateSignInState(false);
    }
    else if(validation === LoginStatus.NotRegisteres){

    }
  }
}
