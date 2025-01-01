import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { finalize, Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private defaultTimeout = 120000;

  // baseUrl = 'http://localhost:8080/';
  baseUrl = 'https://api.kosine.tech:8990/imageServer/';

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  login(credentials: any): Observable<any> {
    this.loaderService.startLoading();
    return this.http.post(this.baseUrl + 'iot/data/signin', credentials).pipe(
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
