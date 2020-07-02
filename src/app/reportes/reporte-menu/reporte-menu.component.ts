
import { Component, OnInit, ViewChild, OnDestroy, Injectable } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER } from '@angular/material';
import { Plato } from 'src/app/_model/plato';
import { Subscription } from 'rxjs';
import { PlatoService } from 'src/app/_service/plato.service';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { ExportService } from 'src/app/_service/export.service';
import * as jspdf from 'jspdf';
import  'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';

interface jsPDFWithPlugin extends jspdf {
  autoTable : (options: UserOptions) => jspdf;
}

@Component({
  selector: 'app-reporte-menu',
  templateUrl: './reporte-menu.component.html',
  styleUrls: ['./reporte-menu.component.css']
})
export class ReporteMenuComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Plato>;
  displayedColumns = ['nombre', 'precio'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selected = "todos";
  dataPerfiles: any;
  foto: string = '';
  estado: string = '';
  perfiles_subs: Subscription;
  categorias123:string ="todos";
  datos = [];


  constructor(
    private platoService: PlatoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private categoriaService: CategoriaService,
    private excelService: ExportService
  ) { }

  ngOnInit() {
    this.platoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.datos = data;
      console.log('datos', this.datos)
    });
    this.getDataCategoria();
  }

  ngOnDestroy() {
    this.perfiles_subs.unsubscribe();
    console.log('Destroy subscription');
  }

  getDataCategoria() {
    console.log('Ingresa');
    this.perfiles_subs = this.categoriaService.getCategorias().subscribe(data => {
      console.log('Categorias', data);
      this.dataPerfiles = data;
    });
  }

  exportAsXLSX(): void{
    this.excelService.exportToExcel(this.dataSource.data, 'reporte_menu');

  }

  generarPDF(){
    var id = document.getElementById('tabMenu');
    var pdf = new jspdf();
    pdf.text("Reporte Menú", 50, 10);
    pdf.fromHTML(id, 30, 15);
    pdf.save("reporteMenu.pdf");

  }

  createPdf() {

    var img = new Image();
    img.src = "../../../assets/img/favicon.png  ";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    var data =dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    let reporteFinalMenu = [];
    let nomCate: any;
    this.datos.forEach((m:any)=>{
      var menuTemp = [];
      menuTemp.push(m.nombre);
      menuTemp.push(m.precio);
      // this.categoriaService.getCategoriaNombre(m.categoria).subscribe(dato=>{
      //   dato.forEach((nombreCato:any)=>{
      //     nomCate = nombreCato.payload.doc.nombre;
      //   })
      // })
      // menuTemp.push(m.categoria);
      reporteFinalMenu.push(menuTemp);
      // console.log('reporte final menu', reporteFinalMenu);
    });
    var id = document.getElementById('tabMenu');
    const doc = new jspdf('portrait', 'px', 'a4') as jsPDFWithPlugin;
    doc.addImage(data, 'PNG', 10, 10, 30, 30)  
    doc.text("Reporte del menú - Rôti Grillé", 50, 30);
    doc.autoTable({
      margin: {top: 60},
      head: [['Nombre', 'Precio']],
      body: reporteFinalMenu,
    })
    doc.save("reporteMenu.pdf");
  }

  // creaPlato() {
  //   const dialogRef = this.dialog.open(CreaPlatoComponent, {});
  //   dialogRef.afterClosed().subscribe(res => {
  //     console.log(res);
  //     if (res) {
  //       console.log('Creando Plato...');
  //     }
  //   });
  // }

  // creaCategoria() {
  //   const dialogRef = this.dialog.open(CategoriaComponent, {});
  //   dialogRef.afterClosed().subscribe(res => {
  //     console.log(res);
  //     if (res) {
  //       console.log('Creando Categoría...');
  //     }
  //   });
  // }

  // modificaPlato(plato: Plato) {
  //   this.dialog.open(ModificaPlatoComponent, {
  //     data: plato
  //   });
  // }

  // verReceta(plato: Plato) {
  //   this.dialog.open(VerRecetaComponent, {
  //     data: plato
  //   });
  // }

  // eliminar(plato: Plato) {
  //   this.platoService.eliminar(plato).then(() => {
  //     this.snackbar.open('Se elimino el registro', 'AVISO', {
  //       duration: 3000,
  //     });
  //   });
  // }

  applyFilter(e) {
    console.log(e)
    const filterValue = e;
    if (filterValue === 'todos') {
      this.platoService.listar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.dataSource.filter = filterValue;
    }

    console.log(filterValue);
  }

  
}
