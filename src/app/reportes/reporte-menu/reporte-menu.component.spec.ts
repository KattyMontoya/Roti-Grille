import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMenuComponent } from './reporte-menu.component';

describe('ReporteMenuComponent', () => {
  let component: ReporteMenuComponent;
  let fixture: ComponentFixture<ReporteMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
