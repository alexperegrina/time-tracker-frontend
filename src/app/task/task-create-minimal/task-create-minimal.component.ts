import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create-minimal',
  imports: [FormsModule],
  templateUrl: './task-create-minimal.component.html',
  styleUrl: './task-create-minimal.component.scss'
})
export class TaskCreateMinimalComponent {
  taskName: string = '';

  @Output() taskCreated = new EventEmitter<void>();

  constructor(private taskService: TaskService) { }

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
