import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidoComponent } from './ver-pedido.component';

describe('VerPedidoComponent', () => {
  let component: VerPedidoComponent;
  let fixture: ComponentFixture<VerPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
