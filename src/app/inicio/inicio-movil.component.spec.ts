import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMovilComponent } from './inicio-movil.component';

describe('InicioMovilComponent', () => {
  let component: InicioMovilComponent;
  let fixture: ComponentFixture<InicioMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
