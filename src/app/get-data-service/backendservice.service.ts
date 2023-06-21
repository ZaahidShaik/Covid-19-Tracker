import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { dataType } from '../homepage/homepage.component';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  url4getLatestData = 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true'

  constructor(private _http: HttpClient) { }

   
   options = {
    observe: 'response',
    responseType: 'json',
  }

  getDataForAllCountry(): Observable<dataType[]>{
    return this._http.get<dataType[]>(this.url4getLatestData, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );;
  }

  getDataForSelectedCountry(){}

  getTrackingCountryList(){}

  addToTrackingCountries(){}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  
}
