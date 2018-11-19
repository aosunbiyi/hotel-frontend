import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessSourceService {

  constructor(private http: HttpClient) { }

  getBusinessSources(): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSources`).pipe(map(this.extractData));
  }

  getBusinessSourceById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSources/${id}`).pipe(map(this.extractData));
  }

  getByBusinessSourceTypeId(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSources/getByBusinessSourceType/${id}`).pipe(map(this.extractData));
  }

  addBusinessSource(BusinessSource): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}BusinessSources`, JSON.stringify(BusinessSource)).pipe(
      tap((ac) => console.log(`added BusinessSource w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addBusinessSource'))
    );
  }

  updateBusinessSource(id, BusinessSource): Observable<any> {
    return this.http.put(`${environment.baseUrl}BusinessSources/` + id, JSON.stringify(BusinessSource)).pipe(
      tap(_ => console.log(`updated BusinessSource id=${id}`)),
      catchError(this.handleError<any>('updateBusinessSource'))
    );
  }

  deleteBusinessSource(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}BusinessSources/` + id).pipe(
      tap(_ => console.log(`deleted BusinessSource id=${id}`)),
      catchError(this.handleError<any>('deleteBusinessSource'))
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
