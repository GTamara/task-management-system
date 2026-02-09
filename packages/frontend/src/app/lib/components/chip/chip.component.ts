import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VisualEntityConfig } from '../../types/types';
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

  chipConfig = input.required<VisualEntityConfig>();
  showLable = input<boolean>(true);
}
