import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http: HttpClient) { }

  getPaymentMethods(): Observable<any> {
    return this.http.get(`${environment.baseUrl}PaymentMethods`).pipe(map(this.extractData));
  }

  getPaymentMethodById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}PaymentMethods/${id}`).pipe(map(this.extractData));
  }

  addPaymentMethod(paymentMethod): Observable<any> {
    console.log(paymentMethod);
    return this.http.post<any>(`${environment.baseUrl}PaymentMethods`, JSON.stringify(paymentMethod)).pipe(
      tap((ac) => console.log(`added paymentMethod w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addPaymentMethod'))
    );
  }

  updateDiscount(id, paymentMethod): Observable<any> {
    return this.http.put(`${environment.baseUrl}PaymentMethods/` + id, JSON.stringify(paymentMethod)).pipe(
      tap(_ => console.log(`updated paymentMethod id=${id}`)),
      catchError(this.handleError<any>('updatePaymentMethod'))
    );
  }

  deleteDiscount(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}PaymentMethods/` + id).pipe(
      tap(_ => console.log(`deleted paymentMethod id=${id}`)),
      catchError(this.handleError<any>('deletePaymentMethod'))
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
