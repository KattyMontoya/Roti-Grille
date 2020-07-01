import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInicioComponent } from './modificar-inicio.component';

describe('ModificarInicioComponent', () => {
  let component: ModificarInicioComponent;
  let fixture: ComponentFixture<ModificarInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
