import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { apiInterceptor } from './service/api.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
      provideHttpClient(
      withInterceptors([apiInterceptor]),
      withFetch(),
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      // NgHttpLoaderModule.forRoot(),
      // NgxPermissionsModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })),
    provideAnimationsAsync(),
  ]
};
//   providers: [
//     provideRouter(routes),
//     provideClientHydration(),
//     provideHttpClient(
//       withInterceptors([apiInterceptor]),
//       withFetch(),
//       withInterceptorsFromDi()
//     ),
//     importProvidersFrom(
//       NgHttpLoaderModule.forRoot(),
//       NgxPermissionsModule.forRoot(),
//       ToastrModule.forRoot({
//         timeOut: 3000,
//         positionClass: 'toast-top-right',
//         preventDuplicates: true,
//       })),
//     provideAnimationsAsync(),
//     provideNativeDateAdapter(),
//   ]

