import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmpleadosComponent } from './home-empleados.component';

describe('HomeEmpleadosComponent', () => {
  let component: HomeEmpleadosComponent;
  let fixture: ComponentFixture<HomeEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
