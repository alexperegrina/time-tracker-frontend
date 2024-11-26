import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../entity/task';
import { TaskButtonTrackingComponent } from "../task-button-tracking/task-button-tracking.component";

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule, CommonModule, TaskButtonTrackingComponent],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  loading = true;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskById(taskId);
    }
  }

  taskById(id: string): void {
    this.loading = true;
    this.taskService.taskById(id).subscribe({
      next: (response: Task) => {
        this.task = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching task details:', err);
        this.loading = false;
      },
    });
  }
}