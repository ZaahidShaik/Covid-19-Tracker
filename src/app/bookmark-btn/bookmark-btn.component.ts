import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { UserPreferencesService } from '../user preferences/user-preferences.service';

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
export class BookmarkBtnComponent {

  @Input() public state: boolean = false;

  @Input() public countryName: any = {};

  constructor(private _preference: UserPreferencesService){}

  protected get direction(): 'bookmark_border' | 'bookmark' {
    return this.state ? 'bookmark' : 'bookmark_border';
  }

  updateState(){
    this.state = !this.state;

    console.log(this.countryName);

    if(this.state){
      console.log("this bookmark status is true: "+ this.state);
      this._preference.addToTraking(this.countryName);

    }
    else if(!this.state){
      console.log("this bookmark status is false: "+ this.state);
      this._preference.untrackCountry(this.countryName);
      
    }
    
  }

}
