import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {User} from "../models/User";
import { environment } from "../environments/environment";
import {Observable} from "rxjs";
export const LISTUSERS_URL=environment.listUsersUrl;
export const USER_URL=environment.UserUrl
@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor( private httpClient: HttpClient,

               private router: Router) {}

  listUsers(page:number,size:number){
    return this.httpClient.get<User[]>(<string>LISTUSERS_URL+'/'+page+'/'+size)
  }
  deleteUser(id:number){
    const url = `${USER_URL}/${id}`;
    return this.httpClient.delete<User>(<string>url)
  }

  patchUser(data:any,id:number): Observable<User>
  {
    const url = `${USER_URL}/${id}`;
    return this.httpClient.patch<User>(url,data);
  }
  countUsers(){
    return this.httpClient.get<number>(<string>USER_URL+'/userCount')
  }

}






