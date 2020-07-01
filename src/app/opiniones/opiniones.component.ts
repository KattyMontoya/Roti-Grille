import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Sugerencias } from '../_model/sugerencias';
import { SugerenciasService } from '../_service/sugerencias.service';
import { VerOpinionComponent } from './ver-opinion/ver-opinion.component';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent implements OnInit {
  selected = "todos";
  // opiniones:Array<any>=[
  //   {fecha:'10012020', cliente:'Hugo Paz', tipo:'Queja', descripcion:'El baño de hombres estaba sucio', franjah:'11:00 - 15:00', atendida:true},
  //   {fecha:'10012020', cliente:'Nathy Pinto', tipo:'Suguerencia', descripcion:'Vender porcion de ensalada aparte', franjah:'15:00 - 19:00', atendida:false},
  //   {fecha:'10012020', cliente:'Gabriela Parra', tipo:'Queja', descripcion:'La carne estaba quemada', franjah:'19:00 - 23:00', atendida:true}
  // ]
  dataTipo: any;
  perfiles_subs: Subscription;

  dataSource: MatTableDataSource<Sugerencias>;
  displayedColumns = [ 'fecha','uid_mesa', 'tipo', 'detalle', 'acciones'];
  // En la fila de arriba oculte el detalle para trabajar con input dinamicos------------------------------------------------
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private sugerenciaService: SugerenciasService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    public loginService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.sugerenciaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  verReceta(sugerencia: Sugerencias) {
    this.dialog.open(VerOpinionComponent, {
      data: sugerencia
    });
  }

  eliminar(sugerencia: Sugerencias) {
    this.sugerenciaService.eliminar(sugerencia).then(() => {
      this.snackbar.open('Eliminado correctamente', 'AVISO', {
        duration: 3000,
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  applyFilterTipo(e) {
    console.log(e)
    const filterValue = e;
    if (filterValue === 'todos') {
      this.sugerenciaService.listar().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } if (filterValue == 'queja') {
      this.sugerenciaService.listarQuejas().subscribe(data => {
        this.dataSource.filter = filterValue;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }if (filterValue == 'sugerencia') {
      this.sugerenciaService.listarSugerencias().subscribe(data => {
        this.dataSource.filter = filterValue;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    console.log(filterValue);
  }

}
