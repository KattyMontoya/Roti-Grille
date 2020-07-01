import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DetalleOrdenComponent} from '../ordenes/detalle-orden/detalle-orden.component';
import { PedidosEntService } from '../_service/pedidosEnt.service';
import { Pedidos } from '../_model/pedidos';
import { Subscription } from 'rxjs';
import { DispositivosService } from '../_service/dispositivos.service';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  // dataUser: User;
  dataPedidos: any;
  foto: string = '';
  estado: string = '';
  perfiles_subs: Subscription;
  mesa1: 'ee7bc94a-4bbb-6fdb-3557-700831252518';
  mesa2: String;
  mesa3: String;
  mesa4: String;

  constructor(
    public dialog:MatDialog,
    private pedidosEnt: PedidosEntService,
    private dispositivoService: DispositivosService,
    public loginService: AuthenticationService,

  ) { }

  ngOnInit() {
    this.getDataPedidos();

  }

  ngOnDestroy() {
    this.perfiles_subs.unsubscribe();
    console.log('Destroy subscription');
  }

  async getDataPedidos() {
    console.log('Ingresa');

    this.perfiles_subs = this.pedidosEnt.listar().subscribe(data => {
      console.log('Pedidos', data);
      this.dataPedidos = data;
    });

  }


  verPedido(pedido: Pedidos){
    //console.log(pedido);
    this.dialog.open(DetalleOrdenComponent, {
      data: pedido
    });
  }

}
