import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInicioComponent } from './crear-inicio.component';

describe('CrearInicioComponent', () => {
  let component: CrearInicioComponent;
  let fixture: ComponentFixture<CrearInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
