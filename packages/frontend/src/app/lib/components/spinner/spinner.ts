import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type SpinnerSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-spinner',
  imports: [
    MatProgressSpinnerModule,
  ],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {

  size = input<SpinnerSize>('medium');

  computedSize = computed(() => {
    switch (this.size()) {
      case 'small':
        return 20;
      case 'medium':
        return 40;
      case 'large':
        return 60;
    }
  });
}
