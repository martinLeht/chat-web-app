import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../model/user';

const TEMPUSERS_API_ENDPOINT = 'http://localhost:4200/api/tempusers/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TempUserService {

  constructor(private http: HttpClient) {}


  public getAllTempUsers(): Observable<User[]> {
    return this.http.get<User[]>(TEMPUSERS_API_ENDPOINT)
      .pipe(catchError(this.handleError));
  }

  public getTempUsersById(userId: string): Observable<User> {
    return this.http.get<User>(TEMPUSERS_API_ENDPOINT + userId)
      .pipe(catchError(this.handleError));
  }

  public getTempUsersByUsername(username: string): Observable<User> {
    return this.http.get<User>(TEMPUSERS_API_ENDPOINT)
      .pipe(catchError(this.handleError));
  }

  public saveTempUser(username: string): Observable<User> {
    return this.http.post<User>(TEMPUSERS_API_ENDPOINT, username)
      .pipe(catchError(this.handleError));
  }

  public updateTempUser(tempUser: User): Observable<User> {
    return this.http.put<User>(TEMPUSERS_API_ENDPOINT, tempUser)
      .pipe(catchError(this.handleError));
  }

  public deleteTempUsersById(userId: string): Observable<{}> {
    return this.http.delete(TEMPUSERS_API_ENDPOINT + userId)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  

}
