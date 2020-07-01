import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPromocionComponent } from './ver-promocion.component';

describe('VerPromocionComponent', () => {
  let component: VerPromocionComponent;
  let fixture: ComponentFixture<VerPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
