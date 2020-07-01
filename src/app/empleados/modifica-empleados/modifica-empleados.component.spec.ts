import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaEmpleadosComponent } from './modifica-empleados.component';

describe('ModificaEmpleadosComponent', () => {
  let component: ModificaEmpleadosComponent;
  let fixture: ComponentFixture<ModificaEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
