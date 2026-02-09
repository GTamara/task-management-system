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

  createTask(item: Task): Observable<Task> {
    return this.apiBaseService.post<Task>('tasks', item);
  }

  deleteTask(id: Task['id']): Observable<void> {
    return this.apiBaseService.delete<void>(`tasks/${id}`);
  }

  updateTask(item: Partial<Task>): Observable<Partial<Task>> {
    return this.apiBaseService.patch<Partial<Task>>(`tasks/${item.id}`, item);
  }

}
