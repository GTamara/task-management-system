import { ApplicationConfig, ErrorHandler, LOCALE_ID, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './routing/app.routes';
import { materialConfigProviders } from './material/material.config';
import { GlobalErrorHandlerService } from './core/services/global-error-handler/global-error-handler.service';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

registerLocaleData(localeRu, 'ru', localeRuExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
    ),
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    ...materialConfigProviders,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    provideHttpClient(),
  ]
};
