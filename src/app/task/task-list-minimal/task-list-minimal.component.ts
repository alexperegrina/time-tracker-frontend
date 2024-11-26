import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskButtonTrackingComponent } from "../task-button-tracking/task-button-tracking.component";
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-list-minimal',
  imports: [CommonModule, RouterModule, TaskButtonTrackingComponent],
  templateUrl: './task-list-minimal.component.html',
  styleUrl: './task-list-minimal.component.scss'
})
export class TaskListMinimalComponent extends TaskListComponent { }