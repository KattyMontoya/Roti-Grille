import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginfoComponent } from './paginfo.component';

describe('PaginfoComponent', () => {
  let component: PaginfoComponent;
  let fixture: ComponentFixture<PaginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
