import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaundryHotelService {


  constructor(private http: HttpClient) { }

  getLaundryHotelServices(): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryHotelServices`).pipe(map(this.extractData));
  }

  getLaundryHotelServiceById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}LaundryHotelServices/${id}`).pipe(map(this.extractData));
  }



  addLaundryHotelService(LaundryHotelService): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}LaundryHotelServices`, JSON.stringify(LaundryHotelService)).pipe(
      tap((ac) => console.log(`added LaundryHotelService w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addLaundryHotelService'))
    );
  }

  updateLaundryHotelService(id, LaundryHotelService): Observable<any> {
    return this.http.put(`${environment.baseUrl}LaundryHotelServices/` + id, JSON.stringify(LaundryHotelService)).pipe(
      tap(_ => console.log(`updated LaundryHotelService id=${id}`)),
      catchError(this.handleError<any>('updateLaundryHotelService'))
    );
  }

  deleteLaundryHotelService(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}LaundryHotelServices/` + id).pipe(
      tap(_ => console.log(`deleted LaundryHotelService id=${id}`)),
      catchError(this.handleError<any>('deleteLaundryHotelService'))
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
