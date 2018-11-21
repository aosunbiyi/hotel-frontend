import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelRepresentativeService {

  constructor(private http: HttpClient) { }

  getHotelRepresentatives(): Observable<any> {
    return this.http.get(`${environment.baseUrl}HotelRepresentatives`).pipe(map(this.extractData));
  }

  getHotelRepresentativeById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}HotelRepresentatives/${id}`).pipe(map(this.extractData));
  }

  addHotelRepresentative(rep): Observable<any> {
    console.log(rep);
    return this.http.post<any>(`${environment.baseUrl}HotelRepresentatives`, JSON.stringify(rep)).pipe(
      tap((ac) => console.log(`added HotelRepresentative w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addHotelRepresentative'))
    );
  }

  updateHotelRepresentative(id, account): Observable<any> {
    return this.http.put(`${environment.baseUrl}HotelRepresentatives/` + id, JSON.stringify(account)).pipe(
      tap(_ => console.log(`updated HotelRepresentative id=${id}`)),
      catchError(this.handleError<any>('updateHotelRepresentative'))
    );
  }

  deleteHotelRepresentative(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}HotelRepresentatives/` + id).pipe(
      tap(_ => console.log(`deleted HotelRepresentative id=${id}`)),
      catchError(this.handleError<any>('deleteHotelRepresentative'))
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
