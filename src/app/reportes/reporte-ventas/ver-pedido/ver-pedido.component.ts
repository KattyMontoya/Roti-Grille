import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Pedidos } from 'src/app/_model/pedidos';
import { PedidosEntService } from 'src/app/_service/pedidosEnt.service';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.css']
})
export class VerPedidoComponent implements OnInit {

  dataPedidos: any;
  public pedido : Pedidos;

  constructor(
    public dialogRef: MatDialogRef<VerPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pedidos,
    // @Inject(MAT_DIALOG_DATA) public dato: any,
    // private pedidosEnt: PedidosEntService,
    private pedidosEnt: PedidosEntService,
    private snackbar: MatSnackBar,
    // private fcmService: FcmService
  ) { }

  ngOnInit() {
    this.pedido = new Pedidos();
    this.pedido.fecha = this.data.fecha;
    this.pedido.pedido = this.data.pedido;
    this.pedido.productos = this.data.productos;
    this.pedido.tipo = this.data.tipo;
    this.pedido.total = this.data.total;
    this.pedido.estado = this.data.estado;
    this.pedido.id = this.data.id;
    this.pedido.token = this.data.token.trim();
    // this.token = this.data.token.trim();
    // console.log('Token:', this.token.trim());

  }

  async getDataPedidos() {
    console.log('Ingresa');

    this.pedidosEnt.getPedido(this.data.id).subscribe(data => {
      console.log('Pedidos', data);
      this.dataPedidos = data;
    });

  }

  cerrarOrden(): void {
    this.dialogRef.close();
  }

}
