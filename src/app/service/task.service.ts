import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  createTask(taskName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/time-recording/task/create`, { name: taskName, start: this.now() });
  }

  closeTask(taskName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/time-recording/task/close`, { name: taskName, end: this.now() });
  }

  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/time-recording/task/list`);
  }

  taskById(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/time-recording/task/${taskId}`);
  }

  private now() {
    const date = new Date();
    const dateTimeInAtomFormat = date.toISOString();
    return dateTimeInAtomFormat;
  }
}
