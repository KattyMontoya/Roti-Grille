import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Publicidad } from '../_model/publicidad';
import { PublicidadService } from '../_service/publicidad.service';
import { PerfilService } from '../_service/perfil.service';
import { CreaPublicidadComponent } from './crea-publicidad/crea-publicidad.component';
import { ModificaPublicidadComponent } from './modifica-publicidad/modifica-publicidad.component';
import { VerPublicidadComponent } from './ver-publicidad/ver-publicidad.component';
import { ConfirmaPublicidadComponent } from './confirma-publicidad/confirma-publicidad.component';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  dataPerfiles: any;
  perfiles_subs: Subscription;

  dataSource: MatTableDataSource<Publicidad>;
  displayedColumns = ['nombre', 'detalle', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private publiService: PublicidadService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private perfilService: PerfilService,
  ) { }

  ngOnInit() {
    this.publiService.getPublicidades().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  creaPublicidad() {
    const dialogRef = this.dialog.open(CreaPublicidadComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('Creando Publicidad...');
      }
    });
  }

  modificar(publi: Publicidad) {
    this.dialog.open(ModificaPublicidadComponent, {
      data: publi
    });
  }

  verPublicidad(publi: Publicidad) {
    this.dialog.open(VerPublicidadComponent, {
      data: publi
    });
  }

  eliminarPublicidad(publi: Publicidad) {
    this.dialog.open(ConfirmaPublicidadComponent, {
      data: publi
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
