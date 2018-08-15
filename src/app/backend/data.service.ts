import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: any;
  constructor(private http: HttpClient) {

  }


  getRooms(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms`).pipe(map((response: any) => {
      return response;
    }));
  }
  getRoomById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms/get_room_by_type/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }

  getRoomTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}RoomTypes`).pipe(map((response: any) => {
      return response;
    }));
  }

  postOutofOrderRooms(data): Observable<any> {
    return this.http.post(`${environment.baseUrl}Rooms/out_of_order_rooms`, data).pipe(map((response: any) => {
      return response;
    }));
  }

}
