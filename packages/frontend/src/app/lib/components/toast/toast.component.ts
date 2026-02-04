import { ChangeDetectionStrategy, Component, computed, input, output, OutputEmitterRef } from '@angular/core';
import { MessageType, ToastPosition } from './types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  imports: [
    MatIconModule,
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  messageType = input<MessageType>('info');
  message = input<string>('');
  duration = input<number>(5000);
  position = input<ToastPosition>('bottom-right');

  closeToast: OutputEmitterRef<void> = output<void>();

  protected readonly icon = computed(() => {
    const msgType = this.messageType();

    switch (msgType) {
      case 'success':
        return 'check_circle_outline';
      case 'error':
        return 'error_outline';
      case 'warning':
        return 'warning_amber';
      case 'info':
        return 'info_outline';
      default:
        return 'info_outline';
    };
  });

  close(): void {
    this.closeToast.emit();
  }
}
