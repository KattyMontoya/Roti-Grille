import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaPlatoComponent } from './crea-plato.component';

describe('CreaPlatoComponent', () => {
  let component: CreaPlatoComponent;
  let fixture: ComponentFixture<CreaPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
