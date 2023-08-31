import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {AUTH_URL} from "../../../Services/authentication.service";


const BASE_URL = environment['apiUrl'];
const EXCLUDED_URL = [AUTH_URL];
const EXCLUDED_URL1 = [REGISTER_URL];


@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes('assets')){
      const loginUrl = EXCLUDED_URL.some(url => url === request.url);


      const apiPrefix = loginUrl ? BASE_URL : BASE_URL+'/api';
      const registerUrl = EXCLUDED_URL1.some(url => url === request.url);
      const apiPrefix1 = registerUrl ? BASE_URL : BASE_URL+'/api';

      if(!/^(http|https):/i.test(request.url)){
        request = request.clone({url: `${apiPrefix}${request.url}`})
      }
    }
    console.log(request.url)
    return next.handle(request);
  }
}
