import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { apiInterceptor } from './service/api.interceptor';

import { MatTabsModule } from '@angular/material/tabs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
      provideHttpClient(
      withInterceptors([apiInterceptor]),
      withFetch(),
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      MatTabsModule,
      NgSelectModule,
      TableModule,
      ButtonModule, 
      RippleModule, 
      MultiSelectModule,
      // NgHttpLoaderModule.forRoot(),
      // NgxPermissionsModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
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

