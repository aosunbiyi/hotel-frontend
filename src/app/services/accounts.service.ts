import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Accounts`).pipe(map(this.extractData));
  }

  getAccountByPhone(phone: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}Accounts/getAccountByPhone/${phone}`).pipe(map(this.extractData));
  }

  getAccountByEmail(email: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}Accounts/getAccountByEmail/${email}`).pipe(map(this.extractData));
  }

  getAccountById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Accounts/${id}`).pipe(map(this.extractData));
  }

  addAAcount(account): Observable<any> {
    console.log(account);
    return this.http.post<any>(`${environment.baseUrl}Accounts`, JSON.stringify(account)).pipe(
      tap((ac) => console.log(`added product w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateAccount(id, account): Observable<any> {
    return this.http.put(`${environment.baseUrl}Accounts/` + id, JSON.stringify(account)).pipe(
      tap(_ => console.log(`updated account id=${id}`)),
      catchError(this.handleError<any>('updateAccount'))
    );
  }

  deleteAccount(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}Accounts/` + id).pipe(
      tap(_ => console.log(`deleted account id=${id}`)),
      catchError(this.handleError<any>('deleteAccount'))
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
