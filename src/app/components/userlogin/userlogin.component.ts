import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { formUserLoginModel, userLoginModel } from '../../models/models';
import { InputValidationService } from '../../services/validation-service/input-validation.service';
import { AuthenticatorService, LoginStatus } from '../../services/auth-service/authenticator.service';
import { UserInfoServiceService } from 'src/app/services/user-info-service/user-info-service.service';

@Component({
  selector: 'user-login',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
   UserData: formUserLoginModel = {
    username: '',
    password: '',
   };
   paswordValidations = [
    Validators.required,
    Validators.minLength(6),
   ]
  

   LoginForm!: FormGroup;
  


  @Input() error: string | null = null;
   
  hide: Boolean = true;


  constructor(private _user: UserInfoServiceService,
              private _router: Router,
              private _valid: InputValidationService){}
  


  ngOnInit(): void {
    // Login form Schema.
    this.LoginForm = new FormGroup({
      username: new FormControl(this.UserData.username, [ Validators.required, 
                                                          Validators.minLength(6),
                                                          this._valid.noWhiteSpace()]),

      password: new FormControl(this.UserData.password, [ Validators.required, 
                                                          this._valid.noWhiteSpace()]),
    });
  }

  get username() { return this.LoginForm.get('username'); }

  get password() { return this.LoginForm.get('password'); }

  submit() {
    if (this.LoginForm.valid) {
      
      //Get userName validated.
      // let authentication = this._auth.getLoginValidated(this.LoginForm.value);

      this._user.signInUser(this.mapFormModelToLoginModel(this.LoginForm.value));
    }
  }


  getErros(formcontrol : ValidationErrors | null | undefined | any): any {
    return  this._valid.getErroStrings(formcontrol);
   }

   mapFormModelToLoginModel(userInput: formUserLoginModel){
     let login: userLoginModel = {
      userName: '',
      password: ''
     }

     login.userName = userInput.username;
     login.password = userInput.password;
     
     return login;
   }


  
  directToRegistrations(){
    this._router.navigateByUrl('/user-registration');
  }



}
