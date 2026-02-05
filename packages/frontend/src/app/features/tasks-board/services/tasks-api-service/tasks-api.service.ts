import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from '../../../../core/api/api-base.service';
import { Task } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {

  apiBaseService = inject(ApiBaseService);

  getTasks(): Observable<Task[]> {
    return this.apiBaseService.get<Task[]>('tasks');
  }

  createTask(todo: Task): Observable<Task> {
    return this.apiBaseService.post<Task>('tasks', todo);
  }

  deleteTask(id: number): Observable<void> {
    return this.apiBaseService.delete<void>(`tasks/${id}`);
  }

  updateTask(todo: Partial<Task>): Observable<Partial<Task>> {
    return this.apiBaseService.patch<Partial<Task>>(`tasks/${todo.id}`, todo);
  }

}
