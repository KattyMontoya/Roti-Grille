import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPromocionComponent } from './confirmacion-promocion.component';

describe('ConfirmacionPromocionComponent', () => {
  let component: ConfirmacionPromocionComponent;
  let fixture: ComponentFixture<ConfirmacionPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
