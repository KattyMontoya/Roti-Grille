import { Component, OnInit, Inject } from '@angular/core';
import { Pedidos } from 'src/app/_model/pedidos';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PedidosEntService } from 'src/app/_service/pedidosEnt.service';
import { FcmService } from 'src/app/_service/fcm.service';
import { DetalleOrdenComponent } from '../detalle-orden/detalle-orden.component';

@Component({
  selector: 'app-rechazar-orden',
  templateUrl: './rechazar-orden.component.html',
  styleUrls: ['./rechazar-orden.component.css']
})
export class RechazarOrdenComponent implements OnInit {
  
  dataPedidos: any;
  pedidoNuevo: Pedidos;
  pedidoProduccion: Pedidos;
  pedidofinalizado: Pedidos;
  public observacion: boolean;
  token: string;
  dataDispositivo: any;

  constructor(
    public dialogRef: MatDialogRef<RechazarOrdenComponent>,
    public dialog: MatDialogRef<DetalleOrdenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pedidos,
    @Inject(MAT_DIALOG_DATA) public dato: any,
    private pedidosEnt: PedidosEntService,
    // private dispositivoService: DispositivosService,
    private snackbar: MatSnackBar,
    private fcmService: FcmService
  ) { }

  ngOnInit() {
    console.log('Pedido entrante', this.data);
    this.pedidoNuevo = new Pedidos();
    this.pedidoNuevo.fecha = this.data.fecha;
    this.pedidoNuevo.pedido = this.data.pedido;
    this.pedidoNuevo.productos = this.data.productos;
    this.pedidoNuevo.tipo = this.data.tipo;
    this.pedidoNuevo.total = this.data.total;
    this.pedidoNuevo.estado = this.data.estado;
    this.pedidoNuevo.id = this.data.id;
    this.pedidoNuevo.mensaje = this.data.mensaje;
    this.pedidoNuevo.token = this.data.token.trim();
    this.pedidoNuevo.uid_mesa = this.data.uid_mesa;
    this.token = this.data.token.trim();
    console.log('Token:', this.token.trim());
  }

  rechazarOrden() {
    setTimeout(() => {
      this.pedidofinalizado = new Pedidos();

      this.pedidofinalizado.fecha = this.pedidoNuevo.fecha;
      this.pedidofinalizado.pedido = this.pedidoNuevo.pedido;
      this.pedidofinalizado.productos = this.data.productos;
      this.pedidofinalizado.tipo = this.pedidoNuevo.tipo;
      this.pedidofinalizado.total = this.pedidoNuevo.total;
      this.pedidofinalizado.estado = this.pedidoNuevo.estado;
      this.pedidofinalizado.id = this.pedidoNuevo.id;
      this.pedidofinalizado.token = this.pedidoNuevo.token.trim();
      this.pedidofinalizado.uid_mesa = this.pedidoNuevo.uid_mesa;
      this.pedidofinalizado.tipo = 'terminado';
      this.pedidoNuevo.tipo = 'finalizado';
      this.pedidofinalizado.estadoPedido = 'Rechazado';
      this.pedidofinalizado.mensaje = this.pedidoNuevo.mensaje;


      //console.log('mandado a produccion', this.pedidoProduccion);
      this.pedidosEnt.modificar(this.pedidofinalizado);
    }, 10000);

    this.pedidofinalizado = new Pedidos();

    this.pedidofinalizado.fecha = this.pedidoNuevo.fecha;
    this.pedidofinalizado.pedido = this.pedidoNuevo.pedido;
    this.pedidofinalizado.productos = this.pedidoNuevo.productos;
    this.pedidofinalizado.tipo = this.pedidoNuevo.tipo;
    this.pedidofinalizado.total = this.pedidoNuevo.total;
    this.pedidofinalizado.estado = this.pedidoNuevo.estado;
    this.pedidofinalizado.id = this.pedidoNuevo.id;
    this.pedidofinalizado.token = this.pedidoNuevo.token.trim();
    this.pedidofinalizado.uid_mesa = this.pedidoNuevo.uid_mesa;
    this.pedidofinalizado.tipo = 'finalizado';
    this.pedidoNuevo.tipo = 'finalizado';
    this.pedidofinalizado.estadoPedido = 'Rechazado';
    this.pedidofinalizado.mensaje = this.pedidoNuevo.mensaje;
    this.token = this.data.token.trim();

    if (this.token.trim()) {
      const title = 'Pedido Rechazado';
      const sms = this.pedidoNuevo.mensaje;
      this.fcmService.sendPostRequest_Notification(title, sms, this.token.trim());
    }

    //console.log('mandado a produccion', this.pedidoProduccion);
    this.pedidosEnt.modificar(this.pedidofinalizado);

    // this.pedidosEnt.updatePedido(this.pedidoNuevo, this.pedidoNuevo.id).then(() => {
    //   console.log('Update user...');
    // }).catch(error => console.log('Error update user..', error));
    this.snackbar.open('PEDIDO FINALIZADO', 'AVISO', {
      duration: 3000
    });

    this.cerrarOrden();
  }

  cerrarOrden(): void {
    this.dialogRef.close();
    this.dialog.close();
  }
}
