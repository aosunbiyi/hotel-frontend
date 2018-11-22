import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Reservations`).pipe(map(this.extractData));
  }

  GetReservationDetailsByReservationId(id: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.baseUrl}ReservationTransaction/GetReservationDetailsByReservationId/${id}`).pipe(map(this.extractData));
  }


  getReservationById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Reservations/${id}`).pipe(map(this.extractData));
  }

  delete_reserved_room(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Reservations/delete_reserved_room/${id}`).pipe(map(this.extractData));
  }

  transfer_room(transferData): Observable<any> {
    console.log(JSON.stringify(transferData));
    return this.http.post<any>(`${environment.baseUrl}Reservations/transfer_room`, JSON.stringify(transferData)).pipe(
      tap((ac) => console.log(`transfer_room w/ id=${ac.id}`)),
      catchError(this.handleError<any>('transfer_room'))
    );
  }


  edit_reserved_room(EditReservationData): Observable<any> {
    console.log(JSON.stringify(EditReservationData));
    return this.http.post<any>(`${environment.baseUrl}Reservations/edit_reserved_room`, JSON.stringify(EditReservationData)).pipe(
      tap((ac) => console.log(`edit_reserved_room w/ id=${ac.id}`)),
      catchError(this.handleError<any>('edit_reserved_room'))
    );
  }


  searchReservationWithParam(searchData): Observable<any> {
    console.log(JSON.stringify(searchData));
    return this.http.post<any>(`${environment.baseUrl}Reservations/searchReservationWithParam`, JSON.stringify(searchData)).pipe(
      tap((ac) => console.log(`searchReservationWithParam w/ id=${ac.id}`)),
      catchError(this.handleError<any>('searchReservationWithParam'))
    );
  }

  addReservation(reservation): Observable<any> {
    console.log(reservation);
    return this.http.post<any>(`${environment.baseUrl}Reservations`, JSON.stringify(reservation)).pipe(
      tap((ac) => console.log(`added product w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateReservation(id, reservation): Observable<any> {
    return this.http.put(`${environment.baseUrl}Reservations/` + id, JSON.stringify(reservation)).pipe(
      tap(_ => console.log(`updated reservation id=${id}`)),
      catchError(this.handleError<any>('updatereservation'))
    );
  }

  deleteReservation(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}Reservations/` + id).pipe(
      tap(_ => console.log(`deleted reservation id=${id}`)),
      catchError(this.handleError<any>('deletereservation'))
    );
  }

  get_total_reservation_rate(data): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post<any>(`${environment.baseUrl}Reservations/get_total_reservation_rate`, JSON.stringify(data)).pipe(
      tap((ac) => console.log(`added reservation w/ id=${ac}`)),
      catchError(this.handleError<any>('get_total_reservation_rate'))
    );
  }


  post_reservations(data): Observable<any> {
    console.log(JSON.stringify(data));
    return this.http.post<any>(`${environment.baseUrl}Reservations/post_reservations`, JSON.stringify(data)).pipe(
      tap((ac) => console.log(`added reservation w/ id=${ac}`)),
      catchError(this.handleError<any>('post_reservations'))
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
