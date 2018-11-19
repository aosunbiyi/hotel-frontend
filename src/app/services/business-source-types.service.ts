import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusinessSourceTypesService {

  constructor(private http: HttpClient) { }

  getBusinessSourceTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSourceTypes`).pipe(map(this.extractData));
  }

  getBusinessSourceTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSourceTypes/${id}`).pipe(map(this.extractData));
  }

  addBusinessSourceType(BusinessSourceType): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}BusinessSourceTypes`, JSON.stringify(BusinessSourceType)).pipe(
      tap((ac) => console.log(`added BusinessSourceType w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addBusinessSourceType'))
    );
  }

  updateBusinessSourceType(id, BusinessSourceType): Observable<any> {
    return this.http.put(`${environment.baseUrl}BusinessSourceTypes/` + id, JSON.stringify(BusinessSourceType)).pipe(
      tap(_ => console.log(`updated BusinessSourceType id=${id}`)),
      catchError(this.handleError<any>('updateBusinessSourceType'))
    );
  }

  deleteBusinessSourceType(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}BusinessSourceTypes/` + id).pipe(
      tap(_ => console.log(`deleted BusinessSourceType id=${id}`)),
      catchError(this.handleError<any>('deleteBusinessSourceType'))
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
