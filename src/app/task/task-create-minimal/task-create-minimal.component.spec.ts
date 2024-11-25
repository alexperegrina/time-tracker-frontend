import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateMinimalComponent } from './task-create-minimal.component';

describe('TaskCreateMinimalComponent', () => {
  let component: TaskCreateMinimalComponent;
  let fixture: ComponentFixture<TaskCreateMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateMinimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCreateMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
