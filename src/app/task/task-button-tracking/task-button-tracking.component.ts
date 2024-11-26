import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../entity/task';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-button-tracking',
  imports: [CommonModule],
  templateUrl: './task-button-tracking.component.html',
  styleUrl: './task-button-tracking.component.scss'
})
export class TaskButtonTrackingComponent {
  @Input() task!: Task;
  @Output() onTaskAction = new EventEmitter<void>();

  constructor(private taskService: TaskService) { }

  toggleAction(): void {
    const action = !this.task.hasInProgress ? 'createTask' : 'closeTask';
    this.taskService[action](this.task.name).subscribe({
      next: () => this.onTaskAction.emit(),
      error: (err) => {
        console.error('Error updating task:', err);
      }
    });
  }
}