import { ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, OnDestroy, OutputRefSubscription } from '@angular/core';
import { ToastConfig, ToastModel } from './types';
import { ToastComponent } from '@lib/components/toast/toast.component';

// Дефолтные настройки
const DEFAULT_TOAST_CONFIG: Required<Omit<ToastConfig, 'message'>> = {
  type: 'info',
  duration: 5000,
  position: 'bottom-right',
};

@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnDestroy {

  private readonly environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);
  private currentToast: ToastModel<ToastComponent> | null = null;

  ngOnDestroy(): void {
    this.destroyToast();
  }

  show(config: ToastConfig): void {
    const toastId = `toast-${Date.now()}`;

    if (this.currentToast !== null) {
      this.destroyToast();

    }

    const finalConfig = this.getConfig(config);

    const toastRef = this.createToastComponent(finalConfig);
    this.setupToastBehavior(toastRef, toastId, finalConfig);
  }

  showSuccess(message: string, duration?: number): void {
    this.show({
      message,
      type: 'success',
      duration,
    });
  }

  showError(message: string, duration?: number): void {
    this.show({
      message,
      type: 'error',
      duration,
    });
  }

  showWarning(message: string, duration?: number): void {
    this.show({
      message,
      type: 'warning',
      duration,
    });
  }

  showInfo(message: string, duration?: number): void {
    this.show({
      message,
      type: 'info',
      duration,
    });
  }

  private destroyToast(): void {
    const toast = this.currentToast;

    if (toast === null) {
      return;
    }

    // Удаляем из DOM
    const nativeElement = toast.ref.location.nativeElement;
    if (nativeElement.parentNode) {
      nativeElement.parentNode.removeChild(nativeElement);
    }

    // Уничтожаем компонент (это вызовет onDestroy)
    toast.ref.destroy();
    toast.subscription.unsubscribe();

    // Очищаем таймер
    if (toast.timeoutId) {
      clearTimeout(toast.timeoutId);
    }

    this.currentToast = null;
  }

  private getConfig(config: ToastConfig): Required<ToastConfig> {
    return {
      message: config.message,
      type: config.type ?? DEFAULT_TOAST_CONFIG.type,
      duration: config.duration ?? DEFAULT_TOAST_CONFIG.duration,
      position: config.position ?? DEFAULT_TOAST_CONFIG.position,
    };
  }

  private createToastComponent(config: Required<ToastConfig>): ComponentRef<ToastComponent> {
    const toastRef: ComponentRef<ToastComponent> = createComponent(ToastComponent, {
      environmentInjector: this.environmentInjector,
    });

    toastRef.setInput('message', config.message);
    toastRef.setInput('messageType', config.type);
    toastRef.setInput('position', config.position);

    document.body.appendChild(toastRef.location.nativeElement);
    toastRef.changeDetectorRef.detectChanges();

    return toastRef;
  }

  private setupToastBehavior(
    toastRef: ComponentRef<ToastComponent>,
    toastId: string,
    finalConfig: Required<ToastConfig>,
  ): void {
    const closeSubscription = this.setupCloseSubscription(toastRef);
    const timeoutId = this.setupAutoClose(finalConfig.duration);
    this.setupCleanupOnDestroy(toastRef);
    this.registerToast(
      toastRef,
      { subscription: closeSubscription, timeoutId },
    );
  }

  private registerToast(
    toastRef: ComponentRef<ToastComponent>,
    behavior: { subscription: OutputRefSubscription; timeoutId: number | null }
  ) {
    this.currentToast = {
      ref: toastRef,
      subscription: behavior.subscription,
      timeoutId: behavior.timeoutId,
    };
  }

  private setupCloseSubscription(toastRef: ComponentRef<ToastComponent>): OutputRefSubscription {
    return toastRef.instance.closeToast.subscribe(() => {
      this.destroyToast();
    });
  }

  private setupAutoClose(duration: number): number | null {
    let timerId: number | null = null;
    if (duration > 0) {
      // TODO: в NG 21 setTimeout будет иметь тип number, поэтому можно будет обойтись без window
      timerId = window.setTimeout(() => this.destroyToast(), duration);
    }
    return timerId;
  }

  private setupCleanupOnDestroy(toastRef: ComponentRef<ToastComponent>) {
    toastRef.onDestroy(() => {
      this.destroyToast();
    });
  }
}
