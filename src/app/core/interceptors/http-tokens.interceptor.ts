import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './../services';

@Injectable()
export class HttpTokensInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headersConfig: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });

    return next.handle(request);
  }
}

/*
eslint
  @typescript-eslint/naming-convention: 0,
  @typescript-eslint/no-explicit-any:0
*/
