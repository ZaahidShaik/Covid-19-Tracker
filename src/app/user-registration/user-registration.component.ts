import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticatorService, LoginStatus } from '../userlogin/authenticator.service';
import { Router } from '@angular/router';
import { userSignupMetadata } from '../models/models';
import { Expression } from '@angular/compiler';
import { InputValidationService } from '../validation service/input-validation.service';



@Component({
  selector: 'user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {


  signUpData: userSignupMetadata = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: '',
   };

   paswordValidations = [
    Validators.required,
    Validators.minLength(6),
   ]
  
  SignupForm!: FormGroup;
  hide = true;
  errorList: any[] | undefined;
 
  @Input() error: string | null = null;
   



 constructor(private _auth: AuthenticatorService,
              private router: Router,
              private _valid: InputValidationService){}
 

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
                                                            this._valid.UsernameInUse()
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
  }

  get firstname() { return this.SignupForm.get('firstname'); }

  get lastname() { return this.SignupForm.get('lastname'); }

  get username() { return this.SignupForm.get('username'); }

  get password() { return this.SignupForm.get('password'); }

  get confirmpassword() { return this.SignupForm.get('confirmpassword'); }




  submit() {

    console.log(this.SignupForm.value);
    
    // if (this.SignupForm.valid) {

      this._auth.getAuthCheck(this.SignupForm.value.username, 
                               this.SignupForm.value.password, LoginStatus.LoggedIn);
      
      this.router.navigateByUrl('/app-homepage');
      
    // }
  }


  getErros(formcontrol : ValidationErrors | null | undefined | any): any {
   return  this._valid.getErroStrings(formcontrol);
  }





}
