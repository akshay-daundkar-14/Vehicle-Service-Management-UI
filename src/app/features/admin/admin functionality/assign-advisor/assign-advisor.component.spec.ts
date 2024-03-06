import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAdvisorComponent } from './assign-advisor.component';

describe('AssignAdvisorComponent', () => {
  let component: AssignAdvisorComponent;
  let fixture: ComponentFixture<AssignAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignAdvisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
