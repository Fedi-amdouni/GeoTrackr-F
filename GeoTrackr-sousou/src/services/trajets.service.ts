import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Trajet } from '../models/trajet';
import { environment } from 'src/environments/environment';
import {USER_URL} from "./list-users.service";

@Injectable({providedIn: 'root'})

export class trajetService{
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  getTrajets(){
    const url = `${this.apiServerUrl}/trajets`;
    return this.http.get<Trajet[]>(url)
  }

  deleteTrajet(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/trajets/${id}`);
  }

}
