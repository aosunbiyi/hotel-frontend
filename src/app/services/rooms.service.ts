import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms`).pipe(map(this.extractData));
  }

  getRoomById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms/${id}`).pipe(map(this.extractData));
  }

  getRoomsByRoomTypeId(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms/getRoomsByRoomTypeId/${id}`).pipe(map(this.extractData));
  }

  getRoomsByFloorId(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms/getRoomsByFloorId/${id}`).pipe(map(this.extractData));
  }

  addAAcount(room): Observable<any> {
    console.log(room);
    return this.http.post<any>(`${environment.baseUrl}Rooms`, JSON.stringify(room)).pipe(
      tap((ac) => console.log(`added room w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addRoom'))
    );
  }

  updateRoom(id, room): Observable<any> {
    return this.http.put(`${environment.baseUrl}Rooms/` + id, JSON.stringify(room)).pipe(
      tap(_ => console.log(`updated room id=${id}`)),
      catchError(this.handleError<any>('updateRoom'))
    );
  }

  deleteRoom(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}Rooms/` + id).pipe(
      tap(_ => console.log(`deleted room id=${id}`)),
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
