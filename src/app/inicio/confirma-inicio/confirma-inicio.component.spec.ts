import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaInicioComponent } from './confirma-inicio.component';

describe('ConfirmaInicioComponent', () => {
  let component: ConfirmaInicioComponent;
  let fixture: ComponentFixture<ConfirmaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
