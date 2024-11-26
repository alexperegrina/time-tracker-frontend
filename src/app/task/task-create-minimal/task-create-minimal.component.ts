import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-task-create-minimal',
  imports: [FormsModule],
  templateUrl: './task-create-minimal.component.html',
  styleUrl: './task-create-minimal.component.scss'
})
export class TaskCreateMinimalComponent extends TaskCreateComponent { }