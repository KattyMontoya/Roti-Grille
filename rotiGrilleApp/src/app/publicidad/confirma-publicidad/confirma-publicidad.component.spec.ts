import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaPublicidadComponent } from './confirma-publicidad.component';

describe('ConfirmaPublicidadComponent', () => {
  let component: ConfirmaPublicidadComponent;
  let fixture: ComponentFixture<ConfirmaPublicidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaPublicidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaPublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
