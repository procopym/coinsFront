import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CONFIG} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


  constructor(private http: HttpClient) {
  }

  getTransactionData(user_id): Observable<any> {
    return this.http.get(CONFIG.getTransactionData + `/${user_id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getUserCounts(user_id): Observable<any> {
    return this.http.get(CONFIG.getUserCounts + `/${user_id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getUserProfile(user_id): Observable<any> {
    return this.http.get(CONFIG.getUserProfile + `/${user_id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  removeTransaction(body: { user_id, transaction_id }): Observable<any> {
    return this.http.post(CONFIG.removeTransaction, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  removeCategory(body: { user_id, category_id }): Observable<any> {
    return this.http.post(CONFIG.removeCategory, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  modifyTransaction(body: { user_id, category_id_from, category_id_to, amount, transaction_date, transaction_id }): Observable<any> {
    return this.http.post(CONFIG.modifyTransaction, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  createTransaction(body: { user_id, category_id_from, category_id_to, amount, transaction_date }): Observable<any> {
    return this.http.post(CONFIG.createTransaction, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  createCategory(body: { user_id, category_name, type, plan_amount?, category_id? }): Observable<any> {
    return this.http.post(CONFIG.createCategory, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getStatsByYear(body: { userId, pivotDate? }): Observable<any> {
    return this.http.post(CONFIG.getStatsByYear, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getStatsPerMonth(body: { userId, transactionType, pivotDate? }): Observable<any> {
    return this.http.post(CONFIG.getStatsPerMonth, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    // In a real world app, we might use a remote logging infrastructure
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an ErrorObservable with a user-facing error message
    return of([]);
  }
}
