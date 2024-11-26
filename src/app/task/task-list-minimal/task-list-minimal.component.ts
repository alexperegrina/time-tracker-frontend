import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { RouterModule } from '@angular/router';
import { Task } from '../entity/task';
import { TaskButtonTrackingComponent } from "../task-button-tracking/task-button-tracking.component";

@Component({
  selector: 'app-task-list-minimal',
  imports: [CommonModule, RouterModule, TaskButtonTrackingComponent],
  templateUrl: './task-list-minimal.component.html',
  styleUrl: './task-list-minimal.component.scss'
})
export class TaskListMinimalComponent implements OnInit {
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
}