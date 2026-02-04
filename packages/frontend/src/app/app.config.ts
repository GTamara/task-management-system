import { ApplicationConfig, ErrorHandler, LOCALE_ID, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { materialConfigProviders } from './material/material.config';
import { GlobalErrorHandlerService } from './core/global-error-handler/global-error-handler.service';

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
    }
  ]
};
