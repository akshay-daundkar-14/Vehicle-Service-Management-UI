import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/components/interceptors/auth.interceptor';
//import * as $ from 'jquery';
//import { DataTablesModule } from 'angular-datatables';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([
      authInterceptor
    ]))
   // DataTablesModule
  ],
};
