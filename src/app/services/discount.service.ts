import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {


  constructor(private http: HttpClient) { }

  getDiscounts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}DiscountPlans`).pipe(map(this.extractData));
  }

  getDiscountById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}DiscountPlans/${id}`).pipe(map(this.extractData));
  }

  addDiscount(discount): Observable<any> {
    console.log(discount);
    return this.http.post<any>(`${environment.baseUrl}DiscountPlans`, JSON.stringify(discount)).pipe(
      tap((ac) => console.log(`added Discount w/ id=${ac.id}`)),
      catchError(this.handleError<any>('addDiscount'))
    );
  }

  updateDiscount(id, discount): Observable<any> {
    return this.http.put(`${environment.baseUrl}DiscountPlans/` + id, JSON.stringify(discount)).pipe(
      tap(_ => console.log(`updated discount id=${id}`)),
      catchError(this.handleError<any>('updateDiscount'))
    );
  }

  deleteDiscount(id): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}DiscountPlans/` + id).pipe(
      tap(_ => console.log(`deleted discount id=${id}`)),
      catchError(this.handleError<any>('deleteDiscount'))
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
