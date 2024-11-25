import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { interval, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  loading = true;
  errorMessage: string | null = null;
  private intervalSubscription: Subscription | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.list();
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.updateElapsedTimes();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  list(): void {
    this.loading = true;
    this.taskService.list().subscribe({
      next: (response) => {
        this.tasks = response.tasks.map((task: any) => ({
          ...task,
          status: task.tracking.some((t: any) => t.end === null) ? 'In Progress' : 'Completed',
          elapsedTime: this.calculateElapsedTime(task),
        }));
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

  calculateElapsedTime(task: any): number {
    const status = task.tracking.some((t: any) => t.end === null) ? 'In Progress' : 'Completed';
    if (status === 'In Progress') {
      const lastTracking = task.tracking.find((t: any) => !t.end);
      if (lastTracking) {
        const startTime = new Date(lastTracking.start).getTime();
        const now = new Date().getTime();
        return Math.floor((now - startTime) / 1000);
      }
    }
    return 0;
  }

  updateElapsedTimes(): void {
    this.tasks.forEach((task) => {
      const status = task.tracking.some((t: any) => t.end === null) ? 'In Progress' : 'Completed';
      if (status === 'In Progress') {
        task.elapsedTime = this.calculateElapsedTime(task);
      }
    });
  }
}