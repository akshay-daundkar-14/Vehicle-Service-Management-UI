import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServiceRepresentativeComponent } from './delete-service-representative.component';

describe('DeleteServiceRepresentativeComponent', () => {
  let component: DeleteServiceRepresentativeComponent;
  let fixture: ComponentFixture<DeleteServiceRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteServiceRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteServiceRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
