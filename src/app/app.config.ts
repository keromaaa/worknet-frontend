import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideAnimationsAsync(),
    AuthService,
  ],
};

export class MyConfig {
  static server_address: string = 'https://api.p2328.app.fit.ba/api';
}
