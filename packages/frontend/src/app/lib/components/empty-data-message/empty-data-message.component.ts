import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-data-message',
  imports: [
    MatIconModule,
  ],
  templateUrl: './empty-data-message.component.html',
  styleUrl: './empty-data-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyDataMessageComponent {

  title = input<string>('Нет данных');
  message = input<string>();
}
