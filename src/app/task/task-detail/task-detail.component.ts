import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../entity/task';

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule, CommonModule],
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

  toggleTask(): void {
    this.loading = true;
    const action = !this.task.hasInProgress ? 'createTask' : 'closeTask';
    this.taskService[action](this.task.name).subscribe({
      next: (response) => {
        this.taskById(this.task.id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.loading = false;
      }
    });
  }
}