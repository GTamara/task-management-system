import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: unknown): void {

    if (error instanceof HttpErrorResponse) {
      const msg = this.getHttpErrorMessage(error);
      console.error('Message from global error handler:', msg);
    }
    console.error(error);
  }

  private getHttpErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0: return 'Сервер недоступен. Проверьте подключение.';
      case 400: return 'Некорректный запрос';
      case 401: return 'Требуется авторизация';
      case 403: return 'Доступ запрещен';
      case 404: return 'Ресурс не найден';
      case 500: return 'Ошибка сервера';
      default: return 'Ошибка сети';
    }
  }
}
