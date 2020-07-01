import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarOrdenComponent } from './aceptar-orden.component';

describe('AceptarOrdenComponent', () => {
  let component: AceptarOrdenComponent;
  let fixture: ComponentFixture<AceptarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
