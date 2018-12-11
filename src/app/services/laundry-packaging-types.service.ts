import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LaundryPackagingTypesService {


  constructor(private http: HttpClient) { }

  getLaundryPackagingTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryPackagingTypes`).pipe(map(this.extractData));
  }

  getLaundryPackagingTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryPackagingTypes/${id}`).pipe(map(this.extractData));
  }



  addLaundryPackagingType(LaundryPackagingType): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}LaundryPackagingTypes`, JSON.stringify(LaundryPackagingType)).pipe(
      tap((ac) => console.log(`added LaundryPackagingType w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addLaundryPackagingType'))
    );
  }

  updateLaundryPackagingType(id, LaundryPackagingType): Observable<any> {
    return this.http.put(`${environment.baseUrl}LaundryPackagingTypes/` + id, JSON.stringify(LaundryPackagingType)).pipe(
      tap(_ => console.log(`updated LaundryPackagingType id=${id}`)),
      catchError(this.handleError<any>('updateLaundryPackagingTypes'))
    );
  }

  deleteLaundryPackagingType(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}LaundryPackagingTypes/` + id).pipe(
      tap(_ => console.log(`deleted LaundryPackagingType id=${id}`)),
      catchError(this.handleError<any>('deleteLaundryPackagingType'))
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
