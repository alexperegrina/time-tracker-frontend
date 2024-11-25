import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskCreateMinimalComponent } from '../task-create-minimal/task-create-minimal.component';
import { TaskListMinimalComponent } from '../task-list-minimal/task-list-minimal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule, TaskCreateComponent, TaskListComponent, TaskCreateMinimalComponent, TaskListMinimalComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit, OnDestroy {
  isSmallScreen: boolean = false;
  private destroy = new Subject<void>();

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  private onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const smallScreenWidth = 768;
    this.isSmallScreen = window.innerWidth <= smallScreenWidth;
  }
}