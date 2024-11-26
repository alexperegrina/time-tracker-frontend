import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { RouterModule } from '@angular/router';
import { Task } from '../entity/task';

@Component({
  selector: 'app-task-list-minimal',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list-minimal.component.html',
  styleUrl: './task-list-minimal.component.scss'
})
export class TaskListMinimalComponent {
  tasks: Task[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.loading = true;
    this.taskService.list().subscribe({
      next: (response: Task[]) => {
        this.tasks = response;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  createTask(taskName: string): void {
    this.taskService.createTask(taskName).subscribe({
      next: () => {
        this.list();
      },
      error: (err) => {
        console.error('Failed to create task:', err);
      },
    });
  }

  closeTask(taskName: string): void {
    this.taskService.closeTask(taskName).subscribe({
      next: () => {
        this.list();
      },
      error: (err) => {
        console.error('Failed to close task:', err);
      },
    });
  }
}