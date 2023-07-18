import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  

  constructor() { }

  private isTrakinglist = new BehaviorSubject<String[]>([ ]);
  curentTrakingCountries = this.isTrakinglist.asObservable();

  lengthOfTrackinglist: any;

  TrackingList: String[] = [];
  

  getSize(){
    this.lengthOfTrackinglist = this.isTrakinglist.subscribe(result => {return result.length})
  }

  addValue( value : string){
    return this.isTrakinglist.subscribe(result => {return result.push(value)})
  }
  

  private updateTrakingList(Newlist: String[]){

    console.log(`updated list : ${Newlist}`);

    this.isTrakinglist.next(Newlist);
     
  }
  
  addToTraking( addCountry : string){

    // if(this.lengthOfTrackinglist !== 0 ){
    //    let Array: String[] = [];

    //   Array = this.addValue(addCountry)

    //   this.updateTrakingList(Array.sort())
    // }

    if(this.TrackingList.length !== 0 ){

      this.TrackingList.push(addCountry)
      this.updateTrakingList(this.TrackingList.sort())

    }else if(this.TrackingList.length == 0){
      this.TrackingList.push(addCountry)
      this.updateTrakingList(this.TrackingList)
    }

  }

  untrackCountry( toRemove : string ){
    this.TrackingList.forEach((iteam, index) => {
      if(iteam === toRemove ) {
        this.TrackingList.splice(index,1);
        this.updateTrakingList(this.TrackingList.sort())
      }} )

  }


}
