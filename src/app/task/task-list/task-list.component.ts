import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { interval, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Task } from '../entity/task';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule, RouterModule],
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

  toggleAction(task: Task): void {
    const action = !task.hasInProgress ? 'createTask' : 'closeTask';
    this.taskService[action](task.name).subscribe({
      next: () => this.list(),
      error: (err) => {
        console.error('Error updating task:', err);
      }
    });
  }
}