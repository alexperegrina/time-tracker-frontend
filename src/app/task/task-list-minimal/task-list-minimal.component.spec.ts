import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListMinimalComponent } from './task-list-minimal.component';

describe('TaskListMinimalComponent', () => {
  let component: TaskListMinimalComponent;
  let fixture: ComponentFixture<TaskListMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListMinimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
