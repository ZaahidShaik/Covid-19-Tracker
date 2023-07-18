import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { dataType } from '../../components/homepage/homepage.component';
import { CountryDeatils } from '../../models/countrystats';
import { userLoginModel, userRegistrationModel } from 'src/app/models/models';
// import { userSignupMetadata } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  // url4getLatestData = 'https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true';

  

  constructor(private _http: HttpClient) { }
   
  getDataForAllCountry(): Observable<CountryDeatils[]>{
    const url4getLatestData = 'http://localhost:8081/covidData/allCountries';
    return this._http.get<CountryDeatils[]>(url4getLatestData, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );
  }

  getDataForSelectedCountry(){}

  getTrackingCountryList(){}

  addToTrackingCountries(){}

  isUsernameValid(username: String): Observable<Boolean>{
    const url4registerUsernameLegal = 'http://localhost:8082/'+username+'/register/legal';
    // console.log(url4registerUsernameLegal);
    
    return this._http.get<Boolean>(url4registerUsernameLegal).pipe(
      catchError(this.handleError)
    );
  }

  saveRegisteredUser(registerUser: userRegistrationModel): Observable<userRegistrationModel>{
    const url4registerUser = 'http://localhost:8082/user/register';
    // how to add payload to the boady of the getrequest.
    console.log("payload Boday ||");
    console.log(registerUser);
    
    return this._http.post<userRegistrationModel>(url4registerUser,registerUser,{responseType: "json"}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * TO-DO: deleteUserAccount(){} impl
   **/

  getUserloggedIn(loginUserCredentials: userLoginModel): Observable<String>{
    const url4UserLogIn = 'http://localhost:8082/user/login';
    console.log("payload User Credentials to Log IN ||");
    console.log(loginUserCredentials);

    return this._http.post<String>(url4UserLogIn,loginUserCredentials,{responseType: "json"}).pipe(
      catchError(this.handleError)
    );
  }

  getUserloggedOut(loginUserCredentials: userLoginModel): Observable<String>{
    const url4UserLoggedOut = 'http://localhost:8082/user/logout';
    console.log("payload User Credentials to Log Out ||");
    console.log(loginUserCredentials);

    return this._http.post<String>(url4UserLoggedOut,loginUserCredentials,{responseType: "json"}).pipe(
      catchError(this.handleError)
    );
  }

  getUserBookmarks(username: String): Observable<CountryDeatils[]>{
    const url4UserBookmarks = 'http://localhost:8081/'+username+'/covidData/bookmarks';
    console.log(url4UserBookmarks);
    

    return this._http.get<CountryDeatils[]>(url4UserBookmarks, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );

  }

  addUserBookmarks(username: String, addContry: String){
    const url4AddingUserBookmarks = 'http://localhost:8081/'+username+'/covidData/bookmarks/add/'+addContry;
    console.log(url4AddingUserBookmarks);
    

    return this._http.post<CountryDeatils[]>(url4AddingUserBookmarks, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );

  }

  removeUserBookmarks(username: String, removeContry: String){
    const url4RemovingUserBookmarks = 'http://localhost:8081/'+username+'/covidData/bookmarks/remove/'+removeContry;
    console.log(url4RemovingUserBookmarks);
    

    return this._http.post<CountryDeatils[]>(url4RemovingUserBookmarks, {responseType: 'json'}).pipe(
      catchError(this.handleError)
    );

  }

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
