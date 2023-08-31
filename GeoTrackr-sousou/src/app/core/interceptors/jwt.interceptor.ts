import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../../Services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.authenticationService.getToken();
    if(token){
      const requestWithToken = request.clone({
        headers : new HttpHeaders({
          Authorization : `Bearer ${token}`  ,
          'Content-type' : 'application/json'
        })

      });
      return next.handle(requestWithToken)
    }
    return next.handle(request);
  }
}
