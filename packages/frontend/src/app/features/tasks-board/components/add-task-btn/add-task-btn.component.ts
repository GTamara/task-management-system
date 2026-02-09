import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip } from "@angular/material/tooltip";
import { Router } from '@angular/router';
import { ERoute } from '@routing/types';

@Component({
  selector: 'app-add-task-btn',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltip
  ],
  templateUrl: './add-task-btn.component.html',
  styleUrl: './add-task-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskBtnComponent {

  private readonly router = inject(Router);

  handleClick() {
    this.router.navigate([`/${ERoute.TASKS_BOARD}/new`]);
  }
}
