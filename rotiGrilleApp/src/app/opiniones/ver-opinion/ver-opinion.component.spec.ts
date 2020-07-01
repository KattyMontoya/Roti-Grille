import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOpinionComponent } from './ver-opinion.component';

describe('VerOpinionComponent', () => {
  let component: VerOpinionComponent;
  let fixture: ComponentFixture<VerOpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
