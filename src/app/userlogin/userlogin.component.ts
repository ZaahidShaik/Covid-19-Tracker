import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticatorService, LoginStatus } from './authenticator.service';
import { Router } from '@angular/router';
import { userLoginMetadata } from '../models/models';
import { InputValidationService } from '../validation service/input-validation.service';

@Component({
  selector: 'user-login',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
   UserData: userLoginMetadata = {
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


  constructor(private _auth: AuthenticatorService,
               private router: Router,
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

      this._auth.getAuthCheck(this.LoginForm.value.username, 
                               this.LoginForm.value.password, LoginStatus.LoggedIn);
      
      this.router.navigateByUrl('/app-homepage');
      
    }
  }


  getErros(formcontrol : ValidationErrors | null | undefined | any): any {
    return  this._valid.getErroStrings(formcontrol);
   }

  
  directToRegistrations(){
    this.router.navigateByUrl('/user-registration');
  }



}
