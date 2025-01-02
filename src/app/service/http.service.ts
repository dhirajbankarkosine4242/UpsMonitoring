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
    return this.http.post(`${this.baseUrl}${url}`, data);
  }

  get(url: string, id?: any): Observable<any[]> {
    if (id) {
      return this.http.get<any>(`${this.baseUrl}${url}/${id}`);
    } else {
      return this.http.get<any>(`${this.baseUrl}${url}`);
    }
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
