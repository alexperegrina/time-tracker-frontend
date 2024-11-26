import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../task/entity/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  createTask(taskName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/time-recording/task/create`, { name: taskName, start: this.now() });
  }

  closeTask(taskName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/time-recording/task/close`, { name: taskName, end: this.now() });
  }

  list(): Observable<Task[]> {
    // return this.http.get(`${this.apiUrl}/time-recording/task/list`);
    return this.http
      .get<{ tasks: Array<{ id: string; name: string; time: { total: number; today: number }; tracking: Array<{ id: string; start: string; end: string | null }> }> }>(
        `${this.apiUrl}/time-recording/task/list`
      )
      .pipe(
        map(response => response.tasks.map(task => Task.createFromResponse(task))) // Accede al array dentro de la propiedad `tasks`
      );
  }

  taskById(taskId: string): Observable<Task> {
    // return this.http.get<any>(`${this.apiUrl}/time-recording/task/${taskId}`);
    return this.http.get<{ id: string; name: string; time: { total: number; today: number }; tracking: Array<{ id: string; start: string; end: string | null }> }>(
      `${this.apiUrl}/time-recording/task/${taskId}`
    ).pipe(
      map(data => Task.createFromResponse(data))
    );
  }

  private now() {
    const date = new Date();
    const dateTimeInAtomFormat = date.toISOString();
    return dateTimeInAtomFormat;
  }
}