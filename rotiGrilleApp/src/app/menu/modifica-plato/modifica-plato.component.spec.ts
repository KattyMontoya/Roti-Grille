import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPlatoComponent } from './modifica-plato.component';

describe('ModificaPlatoComponent', () => {
  let component: ModificaPlatoComponent;
  let fixture: ComponentFixture<ModificaPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
