import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPublicidadComponent } from './crea-publicidad.component';

describe('CreaPublicidadComponent', () => {
  let component: CreaPublicidadComponent;
  let fixture: ComponentFixture<CreaPublicidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaPublicidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaPublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
