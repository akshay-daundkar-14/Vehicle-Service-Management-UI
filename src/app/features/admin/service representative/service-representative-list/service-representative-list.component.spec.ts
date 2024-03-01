import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRepresentativeListComponent } from './service-representative-list.component';

describe('ServiceRepresentativeListComponent', () => {
  let component: ServiceRepresentativeListComponent;
  let fixture: ComponentFixture<ServiceRepresentativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRepresentativeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceRepresentativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
