import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { finalize, Observable, timeout } from 'rxjs';
import { environment } from '../../environments/env.develpoment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  private defaultTimeout = 120000;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  post(url: string, data: any, p0?: { headers: HttpHeaders; responseType: string; }): Observable<any> {
    this.loaderService.startLoading();
    return this.http.post(`${this.baseUrl}${url}`, data).pipe(
      finalize(() => {
        this.loaderService.stopLoading();  // Stop loading after request completes
      })
    );
  }

  get(url: string, id?: any): Observable<any[]> {
    this.loaderService.startLoading(); 
  
    let request: Observable<any>;
  
    if (id) {
      request = this.http.get<any>(`${this.baseUrl}${url}/${id}`);
    } else {
      request = this.http.get<any>(`${this.baseUrl}${url}`);
    }
  
    return request.pipe(
      finalize(() => {
        this.loaderService.stopLoading();  // Stop loading after request completes
      })
    );
  }
  

  login(credentials: any): Observable<any> {
    this.loaderService.startLoading();
    return this.http.post(this.baseUrl + 'signin', credentials).pipe(
      timeout(this.defaultTimeout),
      finalize(() => {
        this.loaderService.stopLoading();
      })
    );
  }

  // public refreshAccessToken(refreshToken: any) {
  //   this.loaderService.startLoading();
  //   const header = new HttpHeaders({
  //     'token': refreshToken
  //   });
  //   return this.http.get(this.baseUrl + 'auth/refresh', {
  //     headers: header,
  //     responseType: 'text'
  //   }).pipe(
  //     timeout(this.defaultTimeout),
  //     finalize(() => {
  //       this.loaderService.stopLoading();
  //     })
  //   );
  // }
  
}
