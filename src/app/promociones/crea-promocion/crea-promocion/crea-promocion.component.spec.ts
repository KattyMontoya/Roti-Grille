import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPromocionComponent } from './crea-promocion.component';

describe('CreaPromocionComponent', () => {
  let component: CreaPromocionComponent;
  let fixture: ComponentFixture<CreaPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
