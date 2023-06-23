import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserPreferencesService } from '../user preferences/user-preferences.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { AuthenticatorService } from '../userlogin/authenticator.service';

@Component({
  selector: 'bookmark',
  templateUrl: './bookmark-btn.component.html',
  styleUrls: ['./bookmark-btn.component.scss'],
  animations: [
    trigger('direction', [
      transition('bookmark <=> bookmark_border', [
        style({
          transform: `scale(0.5)`,
          opacity: 0
        }),
        animate('.1s 0s ease-out'),
      ])
    ])
  ]
})
export class BookmarkBtnComponent implements OnInit {

  @Input() public state: boolean = false;

  @Input() public countryName: any = {};

  private SignInStatus: boolean = false;

  constructor(private _preference: UserPreferencesService,
                            private _snackBar: MatSnackBar,
                            private _auth: AuthenticatorService,){}

  ngOnInit(): void {
    this._auth.curentSignInState.subscribe(status => this.SignInStatus = status);
  }

  protected get direction(): 'bookmark_border' | 'bookmark' {
    return this.state ? 'bookmark' : 'bookmark_border';
  }

  updateState(){
    if(this.SignInStatus === true){

      this.state = !this.state;

      console.log(this.countryName);
  
      if(this.state){
        console.log("this bookmark status is true: "+ this.state);
        this._preference.addToTraking(this.countryName);
        this.openBookmarkSnackBar(`Bookmarked country: ${this.countryName}`,1);
  
      }
      else if(!this.state){
        console.log("this bookmark status is false: "+ this.state);
        this._preference.untrackCountry(this.countryName);
        this.openBookmarkSnackBar(`Unbookmarked country: ${this.countryName}`,1);
        
      }

    }else{
      this.openLoginSnackBar(`Please Login to add Bookmarks..!`);
    }

    
  }


  openBookmarkSnackBar(message: string, autoDismiss: number){
    
    this._snackBar.openFromComponent(SnackBarComponent, {duration: autoDismiss * 1000, 
                                                         data: {message: message, action:'dismiss'},
                                                         verticalPosition: 'top',
                                                         horizontalPosition: 'center'});

  }

  openLoginSnackBar(message: string){
    this._snackBar.openFromComponent(SnackBarComponent, {duration: 5 * 1000, 
      data: {message: message, action:'DirectToLogin'},
      verticalPosition: 'top',
      horizontalPosition: 'center'});

  }

}
