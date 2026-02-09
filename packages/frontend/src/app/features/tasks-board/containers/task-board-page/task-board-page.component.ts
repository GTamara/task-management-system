import { ChangeDetectionStrategy, Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { TasksStoreService } from '../../services/tasks-store-service/tasks-store.service';
import { TasksListComponent } from '@features/tasks-board/components/tasks-list/tasks-list.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ERoute } from '@routing/types';
import { TasksViewStateService as TaskViewStateService } from '@features/tasks-board/services/tasks-view-state/tasks-view-state.service';

@Component({
  imports: [
    TasksListComponent,

    RouterOutlet,

    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
  styleUrls: ['./task-board-page.component.scss'],
  templateUrl: './task-board-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskBoardPageComponent implements OnInit {

  private readonly store = inject(TasksStoreService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly taskViewStateService = inject(TaskViewStateService);

  protected readonly sidenav = viewChild<MatSidenav>('sidenav');

  private readonly shouldOpenSidenavSignal = this.taskViewStateService.isTaskDetailViewActiveSignal;

  constructor () {
    effect(() => {
      const isSidenavOpened = this.shouldOpenSidenavSignal();
      this.updateSidenav(isSidenavOpened);
    });
  }

  ngOnInit(): void {
    this.store.getTasks();
  }

  protected onSidenavClosed() {
    this.router.navigate([`/${ERoute.TASKS_BOARD}`]);
  }

  private updateSidenav (isOpened: boolean) {
    const sideNav = this.sidenav();
    if (!sideNav) return;
    isOpened ? sideNav.open() : sideNav.close();
  }
}
