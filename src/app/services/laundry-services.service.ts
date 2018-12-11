import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaundryService {

  constructor(private http: HttpClient) { }

  getLaundryServices(): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryServices`).pipe(map(this.extractData));
  }

  getLaundryServiceById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryServices/${id}`).pipe(map(this.extractData));
  }

  getLaundryItemsByLaundryServiceId(data): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryServices/getLaundryItems/${data}`).pipe(map(this.extractData));
  }



  addLaundryService(LaundryService): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}LaundryServices`, JSON.stringify(LaundryService)).pipe(
      tap((ac) => console.log(`added LaundryService w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addLaundryService'))
    );
  }

  updateLaundryService(id, LaundryService): Observable<any> {
    return this.http.put(`${environment.baseUrl}LaundryServices/` + id, JSON.stringify(LaundryService)).pipe(
      tap(_ => console.log(`updated LaundryService id=${id}`)),
      catchError(this.handleError<any>('updateLaundryService'))
    );
  }

  deleteLaundryService(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}LaundryServices/` + id).pipe(
      tap(_ => console.log(`deleted LaundryService id=${id}`)),
      catchError(this.handleError<any>('deleteLaundryService'))
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
