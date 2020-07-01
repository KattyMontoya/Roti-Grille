import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPromocionComponent } from './modifica-promocion.component';

describe('ModificaPromocionComponent', () => {
  let component: ModificaPromocionComponent;
  let fixture: ComponentFixture<ModificaPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
