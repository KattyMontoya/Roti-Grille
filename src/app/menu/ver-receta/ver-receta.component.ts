import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Plato } from 'src/app/_model/plato';
import { Ingredientes } from 'src/app/_model/ingredientes';
import { IngredientesService } from 'src/app/_service/ingredientes.service';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria.interface';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.css']
})
export class VerRecetaComponent implements OnInit {

  plato: Plato;
  ingrediente: Ingredientes;
  public idPlato: string;
  public ing = [];
  public categorias = [];
  public nombreCategoria: string;
  dataSource: MatTableDataSource<Ingredientes>;
  displayedColumns = ['ingrediente'];

  constructor(
    public dialogRef: MatDialogRef<VerRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plato,
    private ingredienteService: IngredientesService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.plato = new Plato();
    this.plato.id = this.data.id;
    this.idPlato = this.plato.id;
    this.plato.nombre = this.data.nombre;
    this.plato.categoria = this.data.categoria;
    this.nombreCategoria = this.plato.categoria;
    this.obtenerNombreCategoria();
    //this.plato.ingredientes = this.data.ingredientes;
    this.plato.imagen = this.data.imagen; 
    this.cargaTablaIngredientes();
    //this.plato.detalle = this.data.detalle;
    //console.log(this.data);
  }

  obtenerNombreCategoria(){
    this.categoriaService.getCategoriaNombre(this.nombreCategoria).subscribe(data =>{
      // let categorias = [];
      data.forEach((dato:any) => {
        let catExtraida = new Categoria();
        catExtraida.id = dato.payload.doc.id;
        catExtraida.nombre = dato.payload.doc.data().nombre;
        catExtraida.estado = dato.payload.doc.data().estado;
        this.categorias.push(catExtraida);
        // this.nombreCategoria = dato.payload.doc.nombre;
      });
      console.log('nombre de la categoria', this.categorias);
    });    
  }

  cargaTablaIngredientes(){
    this.ingredienteService.listarIngredientes(this.idPlato).subscribe(data => {        
      // let ing = [];
      data.forEach((dato: any)=>{
        let recetaPlato = new Ingredientes();
        recetaPlato.id = dato.payload.doc.id;
        recetaPlato.idPlato = dato.payload.doc.data().iPlato;
        recetaPlato.ingrediente = dato.payload.doc.data().ingrediente;
        this.ing.push(recetaPlato);
      });      

      //console.log('ingredientes', this.ing);
    });  
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}
