import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleHostoryComponent } from './sale-hostory.component';

describe('SaleHostoryComponent', () => {
  let component: SaleHostoryComponent;
  let fixture: ComponentFixture<SaleHostoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleHostoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleHostoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
