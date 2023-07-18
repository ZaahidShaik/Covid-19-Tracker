import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BackendserviceService } from '../backend-serive/backendservice.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {
  
  validation: boolean = false;

  constructor(private _callSerivce: BackendserviceService,) { }

  getErroStrings(formcontrol : ValidationErrors | null | undefined | any): any {
    
    let errorArr: any[] = [];


     
     const list = formcontrol.errors;

     if(list.length !== 0){
      Object.keys(list).map((error: string) => errorArr.push(this.getErrorExpression(error)))
       console.log(errorArr)
       return errorArr;
     }

     return null

  }

  ngOnInit(){
    this.UsernameInUse();
  }

  private getErrorExpression(errorExpression: string){

    switch(errorExpression){
      case 'required': {
        return 'field is required.';
        break;
      }
      case 'minlength': {
        return 'field must be at least 4 characters long.';
        break;
      }
      case 'nowhitespace': {
        return 'field mush not have white spaces.';
        break;
      }
      // case 'usernameinuse': {
      //   return 'username in use, chose another username.';
      //   break;
      // }
      case 'passwordStrength': {
        return 'password not strong, use atlest one uppercase, lowercase and number.';
        break;
      }   
      case 'paswordsnotmatched': {
        return 'password doesnt match, try again.';
        break;
      }   
      default: { 
        return 0
        break; 
     }
    }

  }

  noWhiteSpace():ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
     
    const value = control.value;

    if(value != null && value.indexOf(' ') != -1){
      console.log(value != null && value.indexOf(' ') != -1);
      return { nowhitespace: true};
    }

    return null;

  }
  }

  unvalidPassword(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
     
    const value = control.value;

    // console.log(value);

    if (!value) {
        return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? {passwordStrength: true}: null;

  }}

  matchingPasswords(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
    const password = control.get(['password']);
    const confirmPassword = control.get(['confirmpassword']);

    if (password?.value !== confirmPassword?.value) {
      console.log(password?.value !== confirmPassword?.value);
      
      return { mismatchedPasswords: true };
    }
    return null;
    }}

  UsernameInUse(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
     
      const value = control.value;
  
      // console.log(value);
  
      if (!value) {
          return null;
      }
      // const usernameValid = value === 'admintest'
      // Add another method to validate the UserName in sure to User Backend Service.

      
      let usernameValid: Boolean;
      usernameValid = this.checkisValidUser(value)
      console.log("username: ");
      console.log(usernameValid);
      console.log("^^^^");
      return !usernameValid ? {usernameinuse: true}: null;
  
    }}
     
    checkisValidUser(value:String): Boolean {

      let Value: any;
      
      Value = this._callSerivce.isUsernameValid(value).subscribe( (results: Boolean) => {
        console.log("result: ");
        console.log(results); 
        if(results === true){
          this.validation = true;
          console.log("inside True");
          
          Value = true;
        }else {
          this.validation = false
          console.log("inside False");
          Value = false;
        }
      })
      console.log("Value | ");
      
      console.log(this.validation);
      

      return this.validation

    }



}
