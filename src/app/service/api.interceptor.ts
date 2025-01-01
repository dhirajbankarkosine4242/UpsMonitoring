import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { Global } from '../admin/dto/dtos';
import { catchError, switchMap, throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

const helper = new JwtHelperService();
let refreshTokenInProgress = false;

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(StorageService);
  const authService = inject(HttpService);
  const router = inject(Router);
  const errorHandlerService = inject(ErrorHandlerService);
  const token = localStorage.getItem(Global.key_token);

  if (req.url.includes('/auth')) {
    return next(req);
  }

  if (token && isAccessTokenExpired(token)) {
    const refreshToken = localStorage.getItem(Global.key_refresh_token);
    if (refreshToken == null || isAccessTokenExpired(refreshToken)) {
      logout(localStorage, router);
      return throwError('Session expired');
    } else {
      if (!refreshTokenInProgress) {
        refreshTokenInProgress = true;
        // return authService.refreshAccessToken(refreshToken)
        //   .pipe(
        //     switchMap(newToken => {
        //       refreshTokenInProgress = false;
        //       localStorage.setItem(Global.key_token, newToken);
        //       return next(injectToken(req, localStorage));
        //     }),
        //     catchError(error => {
        //       logout(localStorage, router);
        //       return throwError(error);
        //     })
        //   );
      }
    }
  } else if (token) {
    req = injectToken(req, localStorage);
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error)
      return errorHandlerService.handleError(error);
    })
  );
};

function injectToken(request: HttpRequest<any>, localStorage: StorageService): HttpRequest<any> {
  const token = localStorage.getItem(Global.key_token);
  return request.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`
    }
  });
}

function logout(localStorage: StorageService, router: Router) {
  localStorage.clear();
  router.navigate(['/login']);
}

function isAccessTokenExpired(token: string): boolean {
  try {
    return helper.isTokenExpired(token);
  } catch (e) {
    return false;
  }
}