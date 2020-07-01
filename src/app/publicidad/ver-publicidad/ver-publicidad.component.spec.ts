import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPublicidadComponent } from './ver-publicidad.component';

describe('VerPublicidadComponent', () => {
  let component: VerPublicidadComponent;
  let fixture: ComponentFixture<VerPublicidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPublicidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
