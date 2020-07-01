import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInicioComponent } from './ver-inicio.component';

describe('VerInicioComponent', () => {
  let component: VerInicioComponent;
  let fixture: ComponentFixture<VerInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
