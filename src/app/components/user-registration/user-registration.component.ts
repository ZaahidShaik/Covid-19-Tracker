import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { formUserRegistrationModel, userRegistrationModel } from '../../models/models';
import { Expression } from '@angular/compiler';
import { InputValidationService } from '../../services/validation-service/input-validation.service';
import { AuthenticatorService, LoginStatus } from '../../services/auth-service/authenticator.service';
import { UserInfoServiceService } from 'src/app/services/user-info-service/user-info-service.service';



@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {


  signUpData: formUserRegistrationModel = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: ''
  };

   paswordValidations = [
    Validators.required,
    Validators.minLength(6),
   ]
  
  SignupForm!: FormGroup;
  hide = true;
  errorList: any[] | undefined;

  usernameNotLegal: Boolean | undefined;
 
  @Input() error: string | null = null;
   



 constructor(private _auth: AuthenticatorService,
              private router: Router,
              private _valid: InputValidationService,
              private _userInfo: UserInfoServiceService){}
 
  
  ngOnInit(): void {
    // Sign up form Schema.
    this.SignupForm = new FormGroup({
      firstname: new FormControl(this.signUpData.username, [ Validators.required, 
                                                             Validators.minLength(6),
                                                             this._valid.noWhiteSpace(),
                                                            ]),

      lastname: new FormControl(this.signUpData.username, [ Validators.required, 
                                                            Validators.minLength(6),
                                                            this._valid.noWhiteSpace(),

                                                          ]),
      username: new FormControl(this.signUpData.username, [ Validators.required, 
                                                            Validators.minLength(6),
                                                            this._valid.noWhiteSpace(),
                                                            // this._valid.UsernameInUse()
                                                          ]),
      password: new FormControl(this.signUpData.password, [ Validators.required, 
                                                            this._valid.noWhiteSpace(),
                                                            this._valid.unvalidPassword()
                                                          ]),
      confirmpassword: new FormControl(this.signUpData.username, [ Validators.required, 
                                                                   this._valid.noWhiteSpace(),
                                                                   this._valid.unvalidPassword()
                                                                 ]),
    }, this._valid.matchingPasswords());
    // console.log(this.SignupForm.value.username);
    
    // this.usernameLegal = this._valid.checkisValid(this.SignupForm.value.username);
  }

  get firstname() { return this.SignupForm.get('firstname'); }

  get lastname() { return this.SignupForm.get('lastname'); }

  get username() { return this.SignupForm.get('username'); }

  get password() { return this.SignupForm.get('password'); }

  get confirmpassword() { return this.SignupForm.get('confirmpassword'); }

   


  submit() {
    this.usernameNotLegal = undefined;

    console.log(this.SignupForm.value);
    console.log("Validation: ");

    
    if (this.SignupForm.valid && this.SignupForm.value.password == this.SignupForm.value.confirmpassword) {
      
      //Get the user Authenticated.
      let authentication = this._auth.getRegistrationValidated(this.SignupForm.value);

      console.log(authentication);
      

      switch(authentication){
        case LoginStatus.Register:{
          console.log("Registered...!");

          //Save User registration data to DB
          this._userInfo.registerUserData(this.mapFormControlToRegisterObject(this.SignupForm.value));
          
          //TO-DO: Add logggic to handle Error, In-case the Login doesn't gets saved.

          // Navigate to Login
          this.router.navigateByUrl('user-login')
          break;
        }

        case LoginStatus.CannotRegister:{
          console.log("CannotRegister...!"); 
          break;
        }
        case LoginStatus.UserNameInUse:{
          console.log("Failed: Username is in use, Enter different Username..!");
          this.usernameNotLegal = true; 
          break;
        }
        case LoginStatus.NotRegistered:{
          break;
        }
        default: { 
          console.log("Failed: Registration Failed, Try again..!");
          
          break; 
       } 
      }
      

      // this.router.navigateByUrl('/app-homepage');
      
    }
  }


  getErros(formcontrol : ValidationErrors | null | undefined | any): any {
   return  this._valid.getErroStrings(formcontrol);
  }

  mapFormControlToRegisterObject( signInformData :formUserRegistrationModel){
    let user: userRegistrationModel = {
      firstName: '',
      lastName: '',
      userName: '',
      password: ''
    }

    user.firstName = signInformData.firstname;
    user.lastName = signInformData.lastname;
    user.userName = signInformData.username;
    user.password = signInformData.password;

    return user;
     
  }





}
