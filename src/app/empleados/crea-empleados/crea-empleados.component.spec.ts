import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaEmpleadosComponent } from './crea-empleados.component';

describe('CreaEmpleadosComponent', () => {
  let component: CreaEmpleadosComponent;
  let fixture: ComponentFixture<CreaEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
