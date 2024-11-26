import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-create',
  imports: [FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent {
  taskName: string = '';

  @Output() taskCreated = new EventEmitter<void>();

  constructor(protected taskService: TaskService) { }

  startTask(): void {
    if (this.taskName.trim()) {
      this.taskService.createTask(this.taskName).subscribe({
        next: () => {
          this.taskName = '';
          this.taskCreated.emit();
        },
        error: (err) => {
          console.error('Error adding task:', err);
        }
      });
    } else {
      console.error('Task name cannot be empty');
    }
  }
}