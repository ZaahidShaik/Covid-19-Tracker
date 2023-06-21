import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticatorService, LoginStatus } from './authenticator.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface usermetadata {
  username: string;
  password: string;
}

@Component({
  selector: 'user-login',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
   UserData: usermetadata = {
    username: '',
    password: '',
   };
  

   form!: FormGroup;
  //  isLogedIn: Boolean = false;
  


  @Input() error: string | null = null;

  // @Output() isSignedIn$ = new EventEmitter();

  constructor(private _auth: AuthenticatorService,
               private router: Router){}
  


  ngOnInit(): void {
    // Login form Schema.
    this.form = new FormGroup({
      username: new FormControl(this.UserData.username),
      password: new FormControl(this.UserData.password),
    });;
  }

  submit() {
    if (this.form.valid) {
      // this.isLogedIn = true
      // // console.log(this.form.valid, this.form.value, this.isLogedIn );
      this._auth.getAuthCheck(this.form.value.username, 
                               this.form.value.password, LoginStatus.LoggedIn);
      
      this.router.navigateByUrl('/');
      
    }
  }




}
