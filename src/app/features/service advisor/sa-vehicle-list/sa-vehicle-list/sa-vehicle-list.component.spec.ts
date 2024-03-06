import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaVehicleListComponent } from './sa-vehicle-list.component';

describe('SaVehicleListComponent', () => {
  let component: SaVehicleListComponent;
  let fixture: ComponentFixture<SaVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaVehicleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
