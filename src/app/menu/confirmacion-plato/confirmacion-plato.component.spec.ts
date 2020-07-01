import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionPlatoComponent } from './confirmacion-plato.component';

describe('ConfirmacionPlatoComponent', () => {
  let component: ConfirmacionPlatoComponent;
  let fixture: ComponentFixture<ConfirmacionPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
