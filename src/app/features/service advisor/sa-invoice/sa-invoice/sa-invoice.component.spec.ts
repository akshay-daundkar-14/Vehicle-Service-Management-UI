import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaInvoiceComponent } from './sa-invoice.component';

describe('SaInvoiceComponent', () => {
  let component: SaInvoiceComponent;
  let fixture: ComponentFixture<SaInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
