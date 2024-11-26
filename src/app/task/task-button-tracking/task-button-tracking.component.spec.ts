import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskButtonTrackingComponent } from './task-button-tracking.component';

describe('TaskButtonTrackingComponent', () => {
  let component: TaskButtonTrackingComponent;
  let fixture: ComponentFixture<TaskButtonTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskButtonTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskButtonTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
