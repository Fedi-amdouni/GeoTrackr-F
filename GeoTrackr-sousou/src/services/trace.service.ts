import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trace } from '../models/trace';

@Injectable({providedIn: 'root'})
export class TraceService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient){}

  public getTraces(): Observable<Trace[]> {
    return this.http.get<Trace[]>(`${this.apiServerUrl}/trace/VALIDE`);
  }

  public addTrace(trace: Trace): Observable<Trace> {
    return this.http.post<Trace>(`${this.apiServerUrl}/trace/addbyadmin`, trace);
  }



  public updateTrace(data:any,id: Number): Observable<Trace> {
    return this.http.patch<Trace>(`${this.apiServerUrl}/trace/`+id,data);
  }

  public deleteTrace(traceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/trace/delete/${traceId}`);
  }
  public getTracesByStatus(status: string): Observable<Trace> {
    return this.http.get<Trace>(`${this.apiServerUrl}/trace/${status}`);
  }

  getTraceCountsByStatus(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/trace/count-by-status`);
  }
}
