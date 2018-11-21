import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {


  constructor(private http: HttpClient) { }

  getAccountTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}AccountTypes`).pipe(map(this.extractData));
  }

  getAccountTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}AccountTypes/${id}`).pipe(map(this.extractData));
  }

  addAccountType(account): Observable<any> {
    console.log(account);
    return this.http.post<any>(`${environment.baseUrl}AccountTypes`, JSON.stringify(account)).pipe(
      tap((ac) => console.log(`added AccountType w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addAccountType'))
    );
  }

  updateAccountType(id, account): Observable<any> {
    return this.http.put(`${environment.baseUrl}AccountTypes/` + id, JSON.stringify(account)).pipe(
      tap(_ => console.log(`updated AccountType id=${id}`)),
      catchError(this.handleError<any>('updateAccountType'))
    );
  }

  deleteAccountType(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}AccountTypes/` + id).pipe(
      tap(_ => console.log(`deleted AccountType id=${id}`)),
      catchError(this.handleError<any>('deleteAccountType'))
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
