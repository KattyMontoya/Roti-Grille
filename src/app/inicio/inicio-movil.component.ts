import { Component, OnInit, ViewChild } from '@angular/core';
import { InicioMovil } from '../_model/inicio';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { InicioMovilService } from '../_service/inicio-movil.service';
import { CrearInicioComponent } from './crear-inicio/crear-inicio.component';
import { ModificarInicioComponent } from './modificar-inicio/modificar-inicio.component';
import { VerInicioComponent } from './ver-inicio/ver-inicio.component';
import { ConfirmaInicioComponent } from './confirma-inicio/confirma-inicio.component';

@Component({
  selector: 'app-inicio-movil',
  templateUrl: './inicio-movil.component.html',
  styleUrls: ['./inicio-movil.component.css']
})
export class InicioMovilComponent implements OnInit {

  dataPerfiles: any;
  inicio_subs: Subscription;

  dataSource: MatTableDataSource<InicioMovil>;
  displayedColumns = ['nombre', 'plataforma', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private inicioService: InicioMovilService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.inicioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  creaInicio() {
    const dialogRef = this.dialog.open(CrearInicioComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('Creando Inicio...');
      }
    });
  }

  modificar(pagInicio: InicioMovil) {
    this.dialog.open(ModificarInicioComponent, {
      data: pagInicio
    });
  }

  verInicio(pagInicio: InicioMovil) {
    this.dialog.open(VerInicioComponent, {
      data: pagInicio
    });
  }

  eliminarInicio(pagInicio: InicioMovil) {
    this.dialog.open(ConfirmaInicioComponent, {
      data: pagInicio
    });
    // this.publiService.eliminar(publi).then(() => {
    //   this.snackbar.open('Se elimino el registro', 'AVISO', {
    //     duration: 3000,
    //   });
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
