import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReporteServiceService } from 'src/app/_service/reporte-service.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { OrdenesComponent } from 'src/app/ordenes/ordenes.component';
import { PedidosEntService } from 'src/app/_service/pedidosEnt.service';
import { ExportService } from 'src/app/_service/export.service';
import { Pedidos } from 'src/app/_model/pedidos';
import { VerPedidoComponent } from './ver-pedido/ver-pedido.component';
import * as jspdf from 'jspdf';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

interface jsPDFWithPlugin extends jspdf {
  autoTable: (options: UserOptions) => jspdf;
}

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  fechaDesde: Date = new Date();
  fechaHasta: Date = new Date();
  minDate: Date;
  maxDate: Date;
  fechainicial: any;
  fechafin: any;
  totalVentasAceptadas: number;
  totalVentasRechazadas: number;
  reporteVentas = [];
  dataSource: MatTableDataSource<Pedidos>; //OrdenesComponent
  displayedColumns = ['uid_mesa', 'pedido', 'fecha', 'estadoPedido', 'total', 'acciones'];
  displayedAceptadosColumns = ['totalAceptados', 'emptyFooter', 'emptyFooter', 'emptyFooter', 'totalAmount', 'emptyFooter'];
  displayedRechazadosColumns = ['totalRechazados', 'emptyFooter', 'emptyFooter', 'emptyFooter', 'vatAmount', 'emptyFooter'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild( 'tblVentas') htmlData:ElementRef;

  constructor(private pedidosEnt: PedidosEntService,
    private excelService: ExportService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  }

  ngOnInit() {
    this.pedidosEnt.listar().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.limpiar();
  }

  buscar() {
    this.totalVentasAceptadas = 0;
    this.totalVentasRechazadas = 0;
    this.reporteVentas = [];
    if (this.fechaDesde > this.fechaHasta) {
      this.snackbar.open('Rango de fechas erroneo', 'AVISO', {
        duration: 3000
      });
    } else {
      this.pedidosEnt.listarPorFecha(this.fechaDesde, this.fechaHasta).subscribe(data => {
        console.log('reporte obtenido', data);
        let pedidosFiltrados = [];
        data.forEach((pedidoFiltrado: any) => {
          let consumo = new Pedidos();
          consumo.id = pedidoFiltrado.payload.doc.id;
          consumo.pedido = pedidoFiltrado.payload.doc.data().pedido;
          consumo.estado = pedidoFiltrado.payload.doc.data().estado;
          consumo.estadoPedido = pedidoFiltrado.payload.doc.data().estadoPedido;
          consumo.fecha = pedidoFiltrado.payload.doc.data().fecha;
          consumo.mensaje = pedidoFiltrado.payload.doc.data().mensaje;
          consumo.productos = pedidoFiltrado.payload.doc.data().productos;
          consumo.tipo = pedidoFiltrado.payload.doc.data().tipo;
          consumo.total = pedidoFiltrado.payload.doc.data().total;
          if(consumo.estadoPedido == 'Rechazado'){
            this.totalVentasRechazadas = this.totalVentasRechazadas + consumo.total;
          }else if(consumo.estadoPedido == 'Aceptado'){
            this.totalVentasAceptadas = this.totalVentasAceptadas + consumo.total;
          }
          consumo.uid_mesa = pedidoFiltrado.payload.doc.data().uid_mesa;
          consumo.token = pedidoFiltrado.payload.doc.data().token;
          pedidosFiltrados.push(consumo);
          // console.log('total de ventas', this.totalVentas);
          this.reporteVentas.push(consumo);
        });
        this.dataSource = new MatTableDataSource(pedidosFiltrados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  limpiar() {
    this.totalVentasAceptadas = 0;
    this.totalVentasRechazadas = 0;
    this.reporteVentas = [];
    let inicioL = new Date(new Date().getFullYear() - 20, 0, 1);
    let finL = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.pedidosEnt.listarPorFecha(inicioL, finL).subscribe(data => {
      console.log('reporte obtenido', data);
      let pedidosFiltrados = [];
      data.forEach((pedidoFiltrado: any) => {
        let consumo = new Pedidos();
        consumo.id = pedidoFiltrado.payload.doc.id;
        consumo.pedido = pedidoFiltrado.payload.doc.data().pedido;
        consumo.estado = pedidoFiltrado.payload.doc.data().estado;
        consumo.estadoPedido = pedidoFiltrado.payload.doc.data().estadoPedido;
        consumo.fecha = pedidoFiltrado.payload.doc.data().fecha;
        consumo.mensaje = pedidoFiltrado.payload.doc.data().mensaje;
        consumo.productos = pedidoFiltrado.payload.doc.data().productos;
        consumo.tipo = pedidoFiltrado.payload.doc.data().tipo;
        consumo.total = pedidoFiltrado.payload.doc.data().total;
        if(consumo.estadoPedido == 'Rechazado'){
          this.totalVentasRechazadas = this.totalVentasRechazadas + consumo.total;
        }else if(consumo.estadoPedido == 'Aceptado'){
          this.totalVentasAceptadas = this.totalVentasAceptadas + consumo.total;
        }
        consumo.uid_mesa = pedidoFiltrado.payload.doc.data().uid_mesa;
        consumo.token = pedidoFiltrado.payload.doc.data().token;
        pedidosFiltrados.push(consumo);
        // console.log('total de ventas', this.totalVentas);
        this.reporteVentas.push(consumo);
      });
      this.dataSource = new MatTableDataSource(pedidosFiltrados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  verPedido(pedido: Pedidos) {
    //console.log(pedido);
    this.dialog.open(VerPedidoComponent, {
      data: pedido
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reportes_ventas');

  }

  exportAsXLSXFiltered(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reportes_ventas');

  }


  ventasPDF() {

    var img = new Image();
    img.src = "../../../assets/img/favicon.png  ";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    var data =dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    let reporteFinal = [];
    this.reporteVentas.forEach((e: any) => {
      var objTemp = [];
      var idMesa: any;
      if (e.uid_mesa == 'ee7bc94a-4bbb-6fdb-3557-700831252518') {
        idMesa = '1';
      } else if (e.uid_mesa == '0188b2b6-63f4-a68c-3352-231110437105') {
        idMesa = '2';
      } else if (e.uid_mesa == '4d9b48fc-fbde-bd04-3548-851020949988') {
        idMesa = '3'
      }
      objTemp.push(idMesa);
      objTemp.push(e.pedido);
      let fechaN = new Date(e.fecha);
      let anio = fechaN.getFullYear();
      let mes = fechaN.getMonth();
      let dia = fechaN.getDate();
      let fechaPedido = dia + '/' + mes + '/' + anio;
      objTemp.push(fechaPedido);
      objTemp.push(e.estadoPedido);
      let pedidoTotal = formatCurrency(e.total, 'en-US', getCurrencySymbol('USD', 'wide'));
      objTemp.push(pedidoTotal);
      reporteFinal.push(objTemp);
    });
    const pdfVentas = new jspdf("portrait","px","a4") as jsPDFWithPlugin;
    pdfVentas.addImage(data, 'PNG', 10, 10, 30, 30)  
    pdfVentas.text("Reporte de ventas - Rôti Grillé", 50, 30);
    pdfVentas.autoTable({
      margin: {top: 60},
      head: [['# Mesa', '# Pedido', 'Fecha', 'Estado', 'Total']],
      body: reporteFinal,
    });
    let totalesAceptado = formatCurrency(this.totalVentasAceptadas, 'en-US', getCurrencySymbol('USD', 'wide'));
    let totalesRechazados = formatCurrency(this.totalVentasRechazadas, 'en-US', getCurrencySymbol('USD', 'wide'));
    pdfVentas.text("Ventas aceptadas:" + totalesAceptado + " Ventas rechazadas:" + totalesRechazados, 10, 485);
    pdfVentas.save("reporteVentas.pdf");
  }

}
