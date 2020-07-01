import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { PedidosEntService } from 'src/app/_service/pedidosEnt.service';
import { Pedidos } from 'src/app/_model/pedidos';
import { FcmService } from 'src/app/_service/fcm.service';
import { DispositivosService } from 'src/app/_service/dispositivos.service'
import { AceptarOrdenComponent } from '../aceptar-orden/aceptar-orden.component';
import { RechazarOrdenComponent } from '../rechazar-orden/rechazar-orden.component';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  dataPedidos: any;
  pedidoNuevo: Pedidos;
  pedidoProduccion: Pedidos;
  pedidofinalizado: Pedidos;
  public observacion: boolean;
  token: string;
  dataDispositivo: any;
  public facturacion = [];
  public nombre: string;
  public apellido: string;
  public cedula: string;
  public direccion: string;

  constructor(
    public dialogRef: MatDialogRef<DetalleOrdenComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Pedidos,
    @Inject(MAT_DIALOG_DATA) public dato: any,
    private pedidosEnt: PedidosEntService,
    private clienteService: ClienteService,
    private dispositivoService: DispositivosService,
    private snackbar: MatSnackBar,
    private fcmService: FcmService
  ) { }

  ngOnInit() {
    console.log('Pedido entrante', this.data);
    // console.log('Dato..?? cliente', this.dato.cliente);
    this.pedidoNuevo = new Pedidos();
    this.pedidoNuevo.fecha = this.data.fecha;
    this.pedidoNuevo.pedido = this.data.pedido;
    this.pedidoNuevo.productos = this.data.productos;
    this.pedidoNuevo.tipo = this.data.tipo;
    this.pedidoNuevo.total = this.data.total;
    this.pedidoNuevo.estado = this.data.estado;
    this.pedidoNuevo.id = this.data.id;
    this.pedidoNuevo.token = this.data.token.trim();
    this.pedidoNuevo.uid_mesa = this.data.uid_mesa;
    this.pedidoNuevo.factura = this.data.factura;
    this.pedidoNuevo.idCliente = this.dato.cliente;
    this.token = this.data.token.trim();
    console.log('cliente:', this.pedidoNuevo.idCliente);

    if (this.pedidoNuevo.factura == true) {
      this.esFactura();
    }

    // this.getDataDispositivo();
    //console.log('detalle Pedido', this.pedidoNuevo.productos);
  }

  esFactura(){
    this.clienteService.datosFac(this.pedidoNuevo.idCliente).subscribe(datoCliente => {
      // this.facturacion = [];
      datoCliente.forEach((fc: any) => {
        let datoFac = new Cliente();
        datoFac.id = fc.payload.doc.id;
        datoFac.apellido = fc.payload.doc.data().apellido;
        this.apellido = datoFac.apellido;
        datoFac.nombre = fc.payload.doc.data().nombre;
        this.nombre = datoFac.nombre;
        datoFac.cedula = fc.payload.doc.data().cedula;
        this.cedula = datoFac.cedula;
        datoFac.direccion = fc.payload.doc.data().direccion;
        this.direccion = datoFac.direccion;
        this.facturacion.push(datoFac);
      });
      console.log('Datos para la factura', this.facturacion);
    });
  }

  accionAceptar(pedido: Pedidos) {
    //console.log(pedido);
    this.dialog.open(AceptarOrdenComponent, {
      data: pedido
    });
    this.cerrarOrden();
  }

  accionRechazar(pedido: Pedidos) {
    //console.log(pedido);
    this.dialog.open(RechazarOrdenComponent, {
      data: pedido
    });
    this.cerrarOrden();
  }

  finalizarOrden() {
    setTimeout(() => {
      this.pedidofinalizado = new Pedidos();

      this.pedidofinalizado.fecha = this.data.fecha;
      this.pedidofinalizado.pedido = this.data.pedido;
      this.pedidofinalizado.productos = this.data.productos;
      this.pedidofinalizado.tipo = this.data.tipo;
      this.pedidofinalizado.total = this.data.total;
      this.pedidofinalizado.estado = this.data.estado;
      this.pedidofinalizado.id = this.data.id;
      this.pedidofinalizado.token = this.data.token.trim();
      this.pedidofinalizado.uid_mesa = this.data.uid_mesa;
      this.pedidofinalizado.tipo = 'terminado';
      this.pedidoNuevo.tipo = 'finalizado';
      this.pedidofinalizado.estadoPedido = 'Aceptado';
      this.token = this.data.token.trim();


      //console.log('mandado a produccion', this.pedidoProduccion);
      this.pedidosEnt.modificar(this.pedidofinalizado);
    }, 60000);
    this.pedidofinalizado = new Pedidos();

    this.pedidofinalizado.fecha = this.data.fecha;
    this.pedidofinalizado.pedido = this.data.pedido;
    this.pedidofinalizado.productos = this.data.productos;
    this.pedidofinalizado.tipo = this.data.tipo;
    this.pedidofinalizado.total = this.data.total;
    this.pedidofinalizado.estado = this.data.estado;
    this.pedidofinalizado.id = this.data.id;
    this.pedidofinalizado.token = this.data.token.trim();
    this.pedidofinalizado.uid_mesa = this.data.uid_mesa;
    this.pedidofinalizado.tipo = 'finalizado';
    this.pedidoNuevo.tipo = 'finalizado';
    this.pedidofinalizado.estadoPedido = 'Aceptado';
    this.token = this.data.token.trim();

    if (this.token.trim()) {
      const title = 'Pedido Finalizado';
      const sms = 'Su pedido está listo';
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


  async getDataPedidos() {
    console.log('Ingresa');

    this.pedidosEnt.getPedido(this.data.id).subscribe(data => {
      console.log('Pedidos', data);
      this.dataPedidos = data;
    });

  }

  // async getDataDispositivo() {
  //   console.log('Ingresa a Mesa');
  //   this.dispositivoService.listar().subscribe(data => {
  //     console.log('Dispositivos', data);
  //     this.dataDispositivo = data;
  //   });
  // }

  cerrarOrden(): void {
    this.dialogRef.close();
  }

}
