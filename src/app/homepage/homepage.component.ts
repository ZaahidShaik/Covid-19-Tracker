import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AuthenticatorService } from '../userlogin/authenticator.service';
import { CountryDeatils } from '../info-card/countrystats';
import { BackendserviceService } from '../get-data-service/backendservice.service';

// const ProductList: Array<CountryDeatils> = [
//   {
//    id: 1,
//    iso: 'us',
//    country: 'country1',
//    infected: 'country 1 Impact Stats',
//    recovered: 'country 1 Impact Stats',
//    deceased: 'country 1 Impact Stats',
//   },
//   {
//    id: 2,
//    iso: 'us',
//    country: 'country2',
//    infected: 'country 2 Impact Stats',
//    recovered: 'country 2 Impact Stats',
//    deceased: 'country 2 Impact Stats',
//   },
//   {
//    id: 3,
//    iso: 'us',
//    country: 'country3',
//    infected: 'country 3 Impact Stats',
//    recovered: 'country 3 Impact Stats',
//    deceased: 'country 3 Impact Stats',
//   },
//   {
//    id: 4,
//    iso: 'us',
//    country: 'country4',
//    infected: 'country 4 Impact Stats',
//    recovered: 'country 4 Impact Stats',
//    deceased: 'country 4 Impact Stats',
//   },
//   {
//     id: 5,
//     iso: 'us',
//     country: 'country4',
//     infected: 'country 4 Impact Stats',
//     recovered: 'country 4 Impact Stats',
//     deceased: 'country 4 Impact Stats',
//    },
//    {
//     id: 6,
//     iso: 'us',
//     country: 'country4',
//     infected: 'country 4 Impact Stats',
//     recovered: 'country 4 Impact Stats',
//     deceased: 'country 4 Impact Stats',
//    },
//    {
//     id: 4,
//     iso: 'us',
//     country: 'country4',
//     infected: 'country 4 Impact Stats',
//     recovered: 'country 4 Impact Stats',
//     deceased: 'country 4 Impact Stats',
//    },
//    {
//      id: 5,
//      iso: 'us',
//      country: 'country4',
//      infected: 'country 4 Impact Stats',
//      recovered: 'country 4 Impact Stats',
//      deceased: 'country 4 Impact Stats',
//     },
//     {
//      id: 6,
//      iso: 'us',
//      country: 'country4',
//      infected: 'country 4 Impact Stats',
//      recovered: 'country 4 Impact Stats',
//      deceased: 'country 4 Impact Stats',
//     },
//     {
//       id: 4,
//       iso: 'us',
//       country: 'country4',
//       infected: 'country 4 Impact Stats',
//       recovered: 'country 4 Impact Stats',
//       deceased: 'country 4 Impact Stats',
//      },
//      {
//        id: 5,
//        iso: 'us',
//        country: 'country4',
//        infected: 'country 4 Impact Stats',
//        recovered: 'country 4 Impact Stats',
//        deceased: 'country 4 Impact Stats',
//       },
//       {
//        id: 6,
//        iso: 'us',
//        country: 'country4',
//        infected: 'country 4 Impact Stats',
//        recovered: 'country 4 Impact Stats',
//        deceased: 'country 4 Impact Stats',
//       },
// ]

export interface dataType {
  country: string;
  infected: number| string;
  tested: number| string;
  recovered: number| string;
  deceased: number| string;
  moreData: number| string;
  historyData: number| string;
  sourceUrl: number| string;
  lastUpdatedApify: number| string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  @Input() BookmarkStatus: boolean = false;
  
   testdata!: CountryDeatils[];

  
  constructor(private _auth: AuthenticatorService,
              private _callSerivce: BackendserviceService){}



  // data:Array<CountryDeatils> = ProductList
  
  ngOnInit(): void {
    this._auth.curentSignInState.subscribe(status => this.BookmarkStatus = status);
    this._callSerivce.getDataForAllCountry().subscribe( (results: CountryDeatils[]) => {
      console.log(results); 
      this.testdata = [...results];
    })
  }

  ngOnDestroy(): void {
    // this._callSerivce.unsubscribe();
    // this._auth.unsubscribe();
  }

  testData(){
    this._callSerivce.getDataForAllCountry().subscribe( (results: CountryDeatils[]) => 
      this.testdata = [...results]
    )
    console.log(this.testdata);
  }

  getAllCountryData(): CountryDeatils[] {
    return this.testdata;
  }

  getBookmarkCountriesData():CountryDeatils[] {
    return this.testdata;
  }

}
