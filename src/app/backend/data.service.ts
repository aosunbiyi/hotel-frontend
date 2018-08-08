import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: any;

  constructor(private http: HttpClient) {

  }


  getRooms(): Observable<any[]> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return this.http.get('http://localhost/api/v1/Rooms', { headers }) as Observable<any>;
  }

}
