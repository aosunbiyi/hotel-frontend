import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {

  constructor(private http: HttpClient) { }


  getRoomTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}RoomTypes`).pipe(map(this.extractData));
  }

  getRoomTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}RoomTypes/${id}`).pipe(map(this.extractData));
  }

  getRoomTypeRates(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}RoomTypes/getRoomTypeRates/${id}`).pipe(map(this.extractData));
  }

  addRoomType(roomType): Observable<any> {
    console.log(roomType);
    return this.http.post<any>(`${environment.baseUrl}RoomTypes`, JSON.stringify(roomType)).pipe(
      tap((ac) => console.log(`added roomType w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addRoom'))
    );
  }

  updateRoomType(id, roomType): Observable<any> {
    return this.http.put(`${environment.baseUrl}RoomTypes/` + id, JSON.stringify(roomType)).pipe(
      tap(_ => console.log(`updated roomType id=${id}`)),
      catchError(this.handleError<any>('updateRoom'))
    );
  }

  deleteRoomType(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}RoomTypes/` + id).pipe(
      tap(_ => console.log(`deleted roomType id=${id}`)),
      catchError(this.handleError<any>('deleteRoom'))
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




