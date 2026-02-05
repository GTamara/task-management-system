import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChipConfig } from './types';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-chip',
  imports: [
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {

  chipConfig = input.required<ChipConfig>();
  showLable = input<boolean>(true);
}
