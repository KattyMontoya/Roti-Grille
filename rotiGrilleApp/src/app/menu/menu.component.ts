import { Plato } from '../_model/plato';
import { PlatoService } from '../_service/plato.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { CreaPlatoComponent } from '../menu/crea-plato/crea-plato.component';
import { ModificaPlatoComponent } from '../menu/modifica-plato/modifica-plato.component';
import { VerRecetaComponent } from '../menu/ver-receta/ver-receta.component';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../_service/categoria.service';
import { CategoriaComponent } from '../categoria/categoria.component';
import { IngredientesService } from '../_service/ingredientes.service';
import { ConfirmacionPlatoComponent } from './confirmacion-plato/confirmacion-plato.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selected = "todos";
  dataSource: MatTableDataSource<Plato>;
  displayedColumns = ['nombre', 'precio', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataPerfiles: any;
  foto: string = '';
  estado: string = '';
  perfiles_subs: Subscription;
  categorias123: string = "todos";

  constructor(
    private platoService: PlatoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private categoriaService: CategoriaService,
    private ingredienteService: IngredientesService
  ) { }

  ngOnInit() {
    this.platoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // this.dataSource.filter = this.applyFilter(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  creaPlato() {
    this.ngOnDestroy();
    // this.perfiles_subs.unsubscribe();
    // console.log('Destroy subscription');
    const dialogRef = this.dialog.open(CreaPlatoComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('Creando Plato...');
      }
    });
  }

  creaCategoria() {
    const dialogRef = this.dialog.open(CategoriaComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('Creando Categoría...');
      }
    });
  }

  modificaPlato(plato: Plato, ingredientes) {
    let dat = Array.of(ingredientes);
    console.log('----------');
    console.log(dat);
    console.log('----------');
    this.ngOnDestroy();
    this.dialog.open(ModificaPlatoComponent, {
      data: plato
    });
  }

  verReceta(plato: Plato) {
    this.dialog.open(VerRecetaComponent, {
      data: plato
    });
  }

  eliminarPlato(plato: Plato) {
    this.dialog.open(ConfirmacionPlatoComponent, {
      data: plato
    });
    // this.ingredienteService.eliminaIngredienteDesdeMenu(plato.ingredientes);
    // this.platoService.eliminar(plato).then(() => {
    //   this.snackbar.open('Se elimino el registro', 'AVISO', {
    //     duration: 3000,
    //   });
    // });
  }

  applyFilterBusqueda(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
