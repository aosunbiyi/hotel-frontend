import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http: HttpClient) { }

  getFloors(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Floors`).pipe(map(this.extractData));
  }

  getFloorById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Floors/${id}`).pipe(map(this.extractData));
  }

  getFloorByWingId(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Floors/getFloorByWingId/${id}`).pipe(map(this.extractData));
  }



  addFloors(floor): Observable<any> {
    console.log(floor);
    return this.http.post<any>(`${environment.baseUrl}Floors`, JSON.stringify(floor)).pipe(
      tap((ac) => console.log(`added floor w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addFloor'))
    );
  }

  updateFloor(id, floor): Observable<any> {
    return this.http.put(`${environment.baseUrl}Floors/` + id, JSON.stringify(floor)).pipe(
      tap(_ => console.log(`updated floor id=${id}`)),
      catchError(this.handleError<any>('updateFloor'))
    );
  }

  deleteFloor(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}Floors/` + id).pipe(
      tap(_ => console.log(`deleted floor id=${id}`)),
      catchError(this.handleError<any>('deleteFloor'))
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
