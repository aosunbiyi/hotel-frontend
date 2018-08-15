import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    return this.http.get(`${environment.baseUrl}Rooms`).pipe(map((response: any) => {
      return response;
    }));
  }
}




export interface RoomType {
  room_type_name: string;
  id: number;
  Rooms: Room[];
}

export interface Room {
  room_type_id: number;
  floor_id: number;
  room_name: string;
  room_owner_id: string;
  id: number;
}

export interface Wing {
  id: number;
  wing_name: string;
  Floors: Floor[];
}

export interface Floor {
  id: number;
  wing_id: number;
  floor_name: string;
  Wing: Wing;
  Rooms: Room[];
}
