import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  private readonly toastService = inject(ToastService);

  handleError(error: unknown): void {
    let message = '';
    if (error instanceof HttpErrorResponse) {
      message = this.getHttpErrorMessage(error);
    }

    this.toastService.showError(message ? message : 'Ошибка!');

    console.error('Message from global error handler:', error);
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
