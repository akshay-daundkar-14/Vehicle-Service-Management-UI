import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceRepresentativeComponent } from './add-service-representative.component';

describe('AddServiceRepresentativeComponent', () => {
  let component: AddServiceRepresentativeComponent;
  let fixture: ComponentFixture<AddServiceRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServiceRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddServiceRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
