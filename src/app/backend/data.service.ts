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

  getRateTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}RateTypes`).pipe(map((response: any) => {
      return response;
    }));
  }

  getRateById(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rates/get_rate_by_type/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }

  getWings(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Wings`).pipe(map((response: any) => {
      return response;
    }));
  }

  getFloorByWingId(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}Floors/get_floors_wing_id/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }

  getRoomByFloorID(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms/get_room_by_floor_id/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }

  getAllTax(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Taxes`).pipe(map((response: any) => {
      return response;
    }));
  }

  getAllBusinessSourceTypes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSourceTypes`).pipe(map((response: any) => {
      return response;
    }));
  }

  getBusinessSourceByTypeId(id): Observable<any> {
    return this.http.get(`${environment.baseUrl}BusinessSources/get_business_source_by_type_id/${id}`).pipe(map((response: any) => {
      return response;
    }));
  }

}
