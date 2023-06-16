import { Component } from '@angular/core';
import { CountryDeatils } from './countrystats';

const ProductList: Array<CountryDeatils> = [
  {
   id: 1,
   name: 'country1',
   infected: 'country 1 Impact Stats',
   recovered: 'country 1 Impact Stats',
   deseased: 'country 1 Impact Stats',
  },
  {
   id: 2,
   name: 'country2',
   infected: 'country 2 Impact Stats',
   recovered: 'country 2 Impact Stats',
   deseased: 'country 2 Impact Stats',
  },
  {
   id: 3,
   name: 'country3',
   infected: 'country 3 Impact Stats',
   recovered: 'country 3 Impact Stats',
   deseased: 'country 3 Impact Stats',
  },
  {
   id: 4,
   name: 'country4',
   infected: 'country 4 Impact Stats',
   recovered: 'country 4 Impact Stats',
   deseased: 'country 4 Impact Stats',
  },
  {
    id: 5,
    name: 'country4',
    infected: 'country 4 Impact Stats',
    recovered: 'country 4 Impact Stats',
    deseased: 'country 4 Impact Stats',
   },
   {
    id: 6,
    name: 'country4',
    infected: 'country 4 Impact Stats',
    recovered: 'country 4 Impact Stats',
    deseased: 'country 4 Impact Stats',
   },
   {
    id: 4,
    name: 'country4',
    infected: 'country 4 Impact Stats',
    recovered: 'country 4 Impact Stats',
    deseased: 'country 4 Impact Stats',
   },
   {
     id: 5,
     name: 'country4',
     infected: 'country 4 Impact Stats',
     recovered: 'country 4 Impact Stats',
     deseased: 'country 4 Impact Stats',
    },
    {
     id: 6,
     name: 'country4',
     infected: 'country 4 Impact Stats',
     recovered: 'country 4 Impact Stats',
     deseased: 'country 4 Impact Stats',
    },
    {
      id: 4,
      name: 'country4',
      infected: 'country 4 Impact Stats',
      recovered: 'country 4 Impact Stats',
      deseased: 'country 4 Impact Stats',
     },
     {
       id: 5,
       name: 'country4',
       infected: 'country 4 Impact Stats',
       recovered: 'country 4 Impact Stats',
       deseased: 'country 4 Impact Stats',
      },
      {
       id: 6,
       name: 'country4',
       infected: 'country 4 Impact Stats',
       recovered: 'country 4 Impact Stats',
       deseased: 'country 4 Impact Stats',
      },
]


@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent {

  productsList: Array<CountryDeatils> = ProductList;

}
