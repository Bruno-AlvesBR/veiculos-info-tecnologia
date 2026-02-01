import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { routes } from './app.routes';
import { createPaginatorIntlPortugueseBrazil } from './providers/paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: MatPaginatorIntl, useFactory: createPaginatorIntlPortugueseBrazil },
  ],
};
