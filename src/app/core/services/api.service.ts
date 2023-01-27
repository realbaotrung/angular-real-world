import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatError));
  }

  put(path: string, body?: Record<string, unknown>): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatError));
  }

  post(path: string, body?: Record<string, unknown>): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatError));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatError));
  }

  private formatError(error: any): Observable<never> {
    // just emit error and nothing else
    return throwError(error.error);
  }
}

/*
eslint
  @typescript-eslint/no-explicit-any: 0
*/
