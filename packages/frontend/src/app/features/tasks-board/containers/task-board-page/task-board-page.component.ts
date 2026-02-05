import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TasksStoreService } from '../../services/tasks-store-service/tasks-store.service';

@Component({
  selector: 'app-task-board-page',
  imports: [],
  templateUrl: './task-board-page.component.html',
  styleUrl: './task-board-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskBoardPageComponent implements OnInit {

  private readonly store = inject(TasksStoreService);
  protected readonly tasksSignal = this.store.tasksSignal;

  ngOnInit(): void {
    this.store.getTasks();
  }
}
