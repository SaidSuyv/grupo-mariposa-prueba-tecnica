import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { STORAGE_KEY } from './core/tokens/storage.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
        }
      }
    }),
    MessageService,
    ConfirmationService,
    {
      provide: STORAGE_KEY,
      useValue: environment.taskStorageKey
    },
  ]
};
