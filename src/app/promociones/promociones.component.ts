import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Promociones } from '../_model/promociones';
import { PromocionesService } from '../_service/promociones.service';
import { CreaPromocionComponent } from './crea-promocion/crea-promocion/crea-promocion.component';
import { ModificaPromocionComponent } from './modifica-promocion/modifica-promocion/modifica-promocion.component';
import { Subscription } from 'rxjs';
import { PerfilService } from '../_service/perfil.service';
import { VerPromocionComponent } from './ver-promocion/ver-promocion.component';
import { ConfirmacionPromocionComponent } from './confirmacion-promocion/confirmacion-promocion.component';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  dataPerfiles: any;
  perfiles_subs: Subscription;

  dataSource: MatTableDataSource<Promociones>;
  displayedColumns = ['nombre', 'detalle', 'precio', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private promocionService: PromocionesService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private perfilService: PerfilService,
    public loginService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.promocionService.getPromociones().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  creaPromocion() {
    const dialogRef = this.dialog.open(CreaPromocionComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('Creando Promocion...');
      }
    });
  }

  modificar(promocion: Promociones) {
    this.dialog.open(ModificaPromocionComponent, {
      data: promocion
    });
  }

  eliminarPromo(promocion: Promociones) {
    this.dialog.open(ConfirmacionPromocionComponent, {
      data: promocion
    });
    // this.promocionService.eliminar(promocion).then(() => {
    //   this.snackbar.open('Se elimino el registro', 'AVISO', {
    //     duration: 3000,
    //   });
    // });
  }

  verPromocion(promocion: Promociones) {
    this.dialog.open(VerPromocionComponent, {
      data: promocion
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngOnDestroy() {
  //   this.perfiles_subs.unsubscribe();
  //   console.log('Destroy subscription');
  // }

  // getDataPerfiles() {
  //   console.log('Ingresa');
  //   this.perfiles_subs = this.perfilService.getPerfiles().subscribe(data => {
  //     console.log('Perfiles', data);
  //     this.dataPerfiles = data;
  //   });

  // }

}
