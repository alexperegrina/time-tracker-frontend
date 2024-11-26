import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { interval, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Task } from '../entity/task';
import { TaskButtonTrackingComponent } from "../task-button-tracking/task-button-tracking.component";

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule, TaskButtonTrackingComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  loading = true;
  errorMessage: string | null = null;
  protected intervalSubscription: Subscription | null = null;

  constructor(protected taskService: TaskService) { }

  ngOnInit(): void {
    this.list();
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.tasks.forEach((task) => { task.elapsedTime; });
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
}