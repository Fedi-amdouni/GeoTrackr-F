// authentication.service.ts
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {User} from "../models/User";
export const API_URL=environment.apiUrl
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs";

export const AUTH_URL = environment.loginUrl;
export const DEFAULT_SIZE = 10

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData!: User;
  USER_DATA = 'userData';
  constructor(
    private httpClient: HttpClient,

    private router: Router
  ) {}
  resetPassword(email: string) {
    // Create the request body with the email
    const requestBody = {
      email: email
    }
    return this.httpClient.post<string>(`${API_URL}/resetPassword`, requestBody);}

  myRole(){
   const data=localStorage.getItem('userData');
    if (data) {
      let dataJson = JSON.parse(data);
      console.log(dataJson["user"].role)
    }
  }

  login(data: any){

    return this.httpClient.post<User>(<string>AUTH_URL, data).pipe(
      tap((data: User) => {
        this.userData = data;
        console.log(data);
        localStorage.clear();
        localStorage.setItem(this.USER_DATA, JSON.stringify(data));


        let tokenStr = "Bearer " + this.userData.token;
        sessionStorage.setItem("token", tokenStr);
      }),

    );
  }

  getToken() {
  const data=localStorage.getItem('userData');
  if(data){
    return JSON.parse(data)["token"]
  }
  }

  isAuthenticated() {
    return !!localStorage.getItem(this.USER_DATA);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['../'])
  }

  myName(){
    const data=localStorage.getItem('userData');
    if (data) {
      let dataJson = JSON.parse(data);
      return dataJson["user"].nom

    }
  }

  myPrenom(){
    const data=localStorage.getItem('userData');
    if (data) {
      let dataJson = JSON.parse(data);
      return dataJson["user"].prenom
    }
  }

  getUserData() {
    const data= localStorage.getItem('userData');
    if(data){
      return JSON.parse(data)["user"];
    }
  }

  private static handleError(error: HttpErrorResponse) {
    const err = new Error('error');
    return throwError(err);
  }

  getUserByEmail(email:any):Observable<any>{
    return this.httpClient.get<User>(`${API_URL}/user/byEmail?email=${email}`)
  }

  changePass(data: any): Observable<string> {
    return this.httpClient.post<string>(`${API_URL}/changePass`, data);
  }
}
