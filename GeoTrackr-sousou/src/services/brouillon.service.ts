import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trace } from '../models/trace';

@Injectable({providedIn: 'root'})
export class BrouillonService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  public addBrouillon(trace: Trace): Observable<Trace> {
    return this.http.post<Trace>(`${this.apiServerUrl}/trace/add`, trace);
  }
  public validerTrace(traceId: number): Observable<Trace> {
    return this.http.patch<Trace>(`${this.apiServerUrl}/trace/${traceId}/valider`,traceId);
  }
  public rejeterTrace(traceId: number): Observable<Trace> {
    return this.http.patch<Trace>(`${this.apiServerUrl}/trace/rejeter/${traceId}`,traceId);
  }

  public getBrouillons(): Observable<Trace[]> {
    return this.http.get<Trace[]>(`${this.apiServerUrl}/trace/BROUILLON`);
  }

}
