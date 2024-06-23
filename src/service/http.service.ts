import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private readonly baseURL: string = "http://localhost:8080/";
  constructor(
    private http: HttpClient
  ) { }

  private getAbsoluteUrl(path: string): string {
    return this.baseURL + path;
  }

  private setHeaders(options: any) {
    const { headers, ...rest } = options;
    options.headers = headers instanceof HttpHeaders ? headers : new HttpHeaders();
    options.headers = options.headers.set('Content-Type', 'application/json');
    options = { ...options, rest };
  }

  public get<T = any>(url: string, options?: any): Observable<T> {
    options = options || {};
    this.setHeaders(options);
    return this.http.get<T>(this.getAbsoluteUrl(url), options as any).pipe(share()) as unknown as Observable<T>;
  }

  public post<T = any>(url: string, body: any, options?: any): Observable<any> {
    options = options || {};
    this.setHeaders(options);
    return this.http.post<T>(this.getAbsoluteUrl(url), body, options).pipe(share()) as unknown as Observable<T>;
  }

  public patch<T = any>(url: string, body: any, options?: any): Observable<any> {
    options = options || {};
    this.setHeaders(options);
    return this.http.patch<T>(this.getAbsoluteUrl(url), body, options).pipe(share()) as unknown as Observable<T>;
  }

  public put<T = any>(url: string, body: any, options?: any): Observable<any> {
    options = options || {};
    this.setHeaders(options);
    return this.http.put<T>(this.getAbsoluteUrl(url), body, options).pipe(share(),) as unknown as Observable<T>;
  }

  public delete<T = any>(url: string, options?: any): Observable<any> {
    options = options || {};
    this.setHeaders(options);
    return this.http.delete<T>(this.getAbsoluteUrl(url), options).pipe(share()) as unknown as Observable<T>;
  }
}