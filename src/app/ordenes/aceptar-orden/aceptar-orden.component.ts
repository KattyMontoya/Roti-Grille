import { Component, OnInit, Inject } from '@angular/core';
import { Pedidos } from 'src/app/_model/pedidos';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PedidosEntService } from 'src/app/_service/pedidosEnt.service';
import { FcmService } from 'src/app/_service/fcm.service';
import { DetalleOrdenComponent } from '../detalle-orden/detalle-orden.component';

@Component({
  selector: 'app-aceptar-orden',
  templateUrl: './aceptar-orden.component.html',
  styleUrls: ['./aceptar-orden.component.css']
})
export class AceptarOrdenComponent implements OnInit {

  dataPedidos: any;
  pedidoNuevo: Pedidos;
  pedidoProduccion: Pedidos;
  pedidofinalizado: Pedidos;
  public observacion: boolean;
  token: string;
  dataDispositivo: any;
  
  constructor(
    public dialogRef: MatDialogRef<AceptarOrdenComponent>,
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

    // this.getDataDispositivo();
  }

  accionAceptar() {
    this.pedidoProduccion = new Pedidos();

    this.pedidoProduccion.fecha = this.pedidoNuevo.fecha;
    this.pedidoProduccion.pedido = this.pedidoNuevo.pedido;
    this.pedidoProduccion.productos = this.pedidoNuevo.productos;
    this.pedidoProduccion.tipo = this.pedidoNuevo.tipo;
    this.pedidoProduccion.total = this.pedidoNuevo.total;
    this.pedidoProduccion.estado = this.pedidoNuevo.estado;
    this.pedidoProduccion.id = this.pedidoNuevo.id;
    this.pedidoProduccion.token = this.pedidoNuevo.token.trim();
    this.pedidoProduccion.uid_mesa = this.pedidoNuevo.uid_mesa;
    this.pedidoProduccion.tipo = 'produccion';
    this.pedidoNuevo.tipo = 'produccion';
    this.pedidoProduccion.estadoPedido = 'Aceptado';
    this.pedidoProduccion.mensaje = this.pedidoNuevo.mensaje;
    this.token = this.data.token.trim();

    if (this.token.trim()) {
      console.log('pedido fue Aceptado');
      const title = 'Pedido Aceptado';
      const sms = this.pedidoNuevo.mensaje + 'minutos';
      this.fcmService.sendPostRequest_Notification(title, sms, this.token.trim());
    }

    //console.log('mandado a produccion', this.pedidoProduccion);
    this.pedidosEnt.modificar(this.pedidoProduccion);

    // this.pedidosEnt.updatePedido(this.pedidoNuevo, this.pedidoNuevo.id).then(() => {
    //   console.log('Update user...');
    // }).catch(error => console.log('Error update user..', error));
    this.snackbar.open('PASADO A PRODUCCION', 'AVISO', {
      duration: 3000
    });

    this.cerrar();
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  soloNumeros(e) {
    let key = window.event ? e.which : e.keyCode
    return (key >= 48 && key <= 57 || key == 8);
  }

}
