import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPublicidadComponent } from './modifica-publicidad.component';

describe('ModificaPublicidadComponent', () => {
  let component: ModificaPublicidadComponent;
  let fixture: ComponentFixture<ModificaPublicidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPublicidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
