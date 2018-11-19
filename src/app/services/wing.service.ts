import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WingService {

  constructor(private http: HttpClient) { }

  getWings(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Wings`).pipe(map(this.extractData));
  }

  getWingById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Wings/${id}`).pipe(map(this.extractData));
  }



  addWing(wing): Observable<any> {
    console.log(wing);
    return this.http.post<any>(`${environment.baseUrl}Wings`, JSON.stringify(wing)).pipe(
      tap((ac) => console.log(`added wing w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addWing'))
    );
  }

  updateWing(id, wing): Observable<any> {
    return this.http.put(`${environment.baseUrl}Wings/` + id, JSON.stringify(wing)).pipe(
      tap(_ => console.log(`updated wing id=${id}`)),
      catchError(this.handleError<any>('updateWing'))
    );
  }

  deleteWing(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}Wings/` + id).pipe(
      tap(_ => console.log(`deleted wing id=${id}`)),
      catchError(this.handleError<any>('deleteWing'))
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
