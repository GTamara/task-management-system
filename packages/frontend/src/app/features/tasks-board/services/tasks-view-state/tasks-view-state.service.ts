import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const TaskDetailViewRoutes = {
  NEW: 'new',
  EDIT: 'edit'
} as const

@Injectable()
export class TasksViewStateService {

  private readonly router = inject(Router);

  readonly isTaskDetailViewActiveSignal = signal<boolean>(false);

  constructor() {
    this.isTaskDetailViewActiveSignal.set(this.checkUrl(this.router.url));

    effect(() => {
      const routerEvent = this.navigationEndSignal();

      if (!(routerEvent instanceof NavigationEnd)) return;

      const url = (routerEvent as NavigationEnd).url;
      const shouldOpenTaskDetailView = this.checkUrl(url);
      this.isTaskDetailViewActiveSignal.set(shouldOpenTaskDetailView);
    });
  }

  private checkUrl(url: string): boolean {
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    const secondLastSegment = segments[segments.length - 2];

    if (lastSegment === TaskDetailViewRoutes.NEW) return true;

    if (!isNaN(Number(lastSegment))) return true;

    if (lastSegment === TaskDetailViewRoutes.EDIT && !isNaN(Number(secondLastSegment))) return true;

    return false;
  }

  private readonly navigationEndSignal = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ),
    { initialValue: null },
  )
}
