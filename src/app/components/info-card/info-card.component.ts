import { Component, Input } from '@angular/core';
import { CountryDeatils } from '../../models/countrystats';
import { dataType } from '../homepage/homepage.component';
import { CountryCodes } from '../../models/countryIsoCodes';
import { UserPreferencesService } from '../../services/user-preferences-service/user-preferences.service';
import { TabStrings } from '../../models/models';


export interface CountryObj {
  name: string,
  code: string,
}



@Component({
  selector: 'country-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {

  // @Input() countryList!: Array<CountryDeatils>;
  @Input() countryList!: Array<CountryDeatils>;

  @Input() isAllCountryTab!: boolean;

  





  constructor(private _preference: UserPreferencesService){}


  getISO(searchCountry: string): string{
    let CountryObj: CountryObj[] = []

    CountryObj = CountryCodes.filter(country => { return country.name === searchCountry })
    if (CountryObj.length !== 0 ){
      return CountryObj[0].code;
    } else {
      return 'us'
    }
    
  }

  getISO_1(searchCountry: string){

    let CountryObj: any = CountryCodes.filter(country => { return country.name === searchCountry })

    console.log(CountryObj);
    
  }

}
