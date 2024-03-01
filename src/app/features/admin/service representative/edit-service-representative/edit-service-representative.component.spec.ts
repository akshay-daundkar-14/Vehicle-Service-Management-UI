import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceRepresentativeComponent } from './edit-service-representative.component';

describe('EditServiceRepresentativeComponent', () => {
  let component: EditServiceRepresentativeComponent;
  let fixture: ComponentFixture<EditServiceRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiceRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiceRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
