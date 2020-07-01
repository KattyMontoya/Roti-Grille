import { PlatoService } from 'src/app/_service/plato.service';
import { Plato } from 'src/app/_model/plato';
import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Ingredientes } from 'src/app/_model/ingredientes';
import { DataRowOutlet } from '@angular/cdk/table';
import { IngredientesService } from 'src/app/_service/ingredientes.service';


@Component({
  selector: 'app-modifica-plato',
  templateUrl: './modifica-plato.component.html',
  styleUrls: ['./modifica-plato.component.css']
})
export class ModificaPlatoComponent implements OnInit {

  id: string;
  form: FormGroup;
  edicion: boolean;
  selected: any;
  @Output()
  propagar = new EventEmitter<any>();
  //platos: Plato;

  archivo: any;
  labelFile: string;
  urlImagen: string;
  precioError: boolean;

  dataUser: Plato;
  dataPerfiles: any;
  foto: string = '';
  estado: string = '';
  perfiles_subs: Subscription;
  base64textString: any;
  public control;
  public arr;
  //ingrediente: Ingredientes[] = [];
  public ingredientes = [];

  dataSource: MatTableDataSource<Ingredientes>;
  displayedColumns = ['ingrediente', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public nuevoIngrediente: boolean = false;
  public idPlato: string;
  public plato = new Plato();
  public platoMod = new Plato();
  public newIngrediente = new Ingredientes;

  constructor(
    public dialogRef: MatDialogRef<ModificaPlatoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plato,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private platoService: PlatoService,
    private router: Router,
    private snackbar: MatSnackBar,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private categoriaService: CategoriaService,
    private ingredienteService: IngredientesService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      'id': new FormControl(''),
      'nombre': new FormControl(''),
      'precio': new FormControl(0,
        [Validators.required,
        Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        Validators.maxLength(5),
        Validators.min(0),
        Validators.max(100)]),

      'id_categoria': new FormControl(''),
      'categoria': new FormControl(''),
      'detalle': new FormControl(''),
      'estado': new FormControl(true),
      'imagen': new FormControl(''),
      'observacion': new FormControl(''),
      'ingrediente': new FormControl(''),
      //ingredientes: this.fb.array([])
    });

    console.log('plato a modificar', this.data);
    this.plato.id = this.data.id;
    this.idPlato = this.plato.id;
    this.cargaTablaIngredientes();
    // this.form = new FormGroup({
    //   'ingrediente': new FormControl('')
    // });
    this.plato.nombre = this.data.nombre;
    this.plato.precio = this.data.precio;
    this.plato.categoria = this.data.categoria;
    this.selected = this.plato.categoria;
    this.plato.detalle = this.data.detalle;
    this.plato.imagen = this.data.imagen;
    this.plato.estado = this.data.estado;
    this.plato.ingredientes = this.data.ingredientes;

    if (this.data.id != null) {
      this.afStorage.ref(`platos/${this.data.id}`).getDownloadURL().subscribe(data => {
        this.urlImagen = data;
      })
    }


    this.getDataCategoria();
  }

  cargaTablaIngredientes() {
    this.ingredienteService.listarIngredientes(this.idPlato).subscribe(data => {
      let ing = [];
      data.forEach((dato: any) => {
        let recetaPlato = new Ingredientes();
        recetaPlato.id = dato.payload.doc.id;
        recetaPlato.idPlato = dato.payload.doc.data().iPlato;
        recetaPlato.ingrediente = dato.payload.doc.data().ingrediente;
        ing.push(recetaPlato);
      });
      this.dataSource = new MatTableDataSource(ing);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
      //console.log('tabla Ingrediente--->', data);
    });
  }

  accionModificar() {
    //let platoMod = new Plato();
    this.platoMod.id = this.plato.id;
    this.platoMod.nombre = this.plato.nombre;
    this.platoMod.precio = this.plato.precio;
    if (this.platoMod.precio < 0 || this.platoMod.precio > 100) {
      this.precioError = true;
    } else{
      this.precioError = false;
    }
    this.platoMod.categoria = this.plato.categoria;
    //this.platoMod.detalle = this.plato.detalle;
    this.platoMod.imagen = this.plato.imagen;
    this.platoMod.estado = this.plato.estado;
    this.platoMod.ingredientes = this.plato.ingredientes;

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`platos/${this.platoMod.id}`);
      ref.put(this.archivo);
      this.platoMod.imagen = this.base64textString;

    }

    if (this.precioError != true) {
      //console.log('Plato modificado--->', this.platoMod);
      this.platoService.modificar(this.platoMod);
      this.snackbar.open('PLATO MODIFICADO', 'AVISO', {
        duration: 3000
      });

      this.propagar.emit(this.selected);

      this.cerrar();
    }

  }

  cerrar(): void {
    this.dialogRef.close();
  }

  seleccionar(e: any) {
    this.archivo = e.target.files[0];
    this.labelFile = e.target.files[0].name;

    // BASE 64
    if (this.archivo) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.archivo);
    }

  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = 'data:image/png;base64,' + btoa(binaryString);
    // console.log('BTO:',btoa(binaryString));
    // console.log('BASE 64:', this.base64textString);
  }

  ngOnDestroy() {
    this.perfiles_subs.unsubscribe();
    //console.log('Destroy subscription');
  }


  async getDataCategoria() {
    //console.log('Ingresa');
    this.perfiles_subs = this.categoriaService.getCategorias().subscribe(data => {
      //console.log('Categorias', data);
      this.dataPerfiles = data;
    });
  }

  //INPUT DINAMICOS
  get getIngredientes() {
    return this.form.get('ingredientes') as FormArray;
  }

  guardarIngrediente() {
    this.newIngrediente.id = this.afs.createId();
    this.newIngrediente.idPlato = this.idPlato;
    this.newIngrediente.ingrediente = this.form.value['ingrediente'];

    this.ingredientes.push(this.newIngrediente.id);
    this.ingredienteService.crearIngrediente(this.newIngrediente);
    //console.log('Ingredientes del plato-->', this.newIngrediente);
    //console.log('Array idIngredientes--->', this.ingredientes);
    //this.cargaTablaIngredientes();
    this.nuevoIngrediente = false;
  }

  anadirIngrediente() {
    this.nuevoIngrediente = true;
    // this.control = <FormArray>this.form.controls['ingredientes'];    
    // //this.control.push(this.fb.group({ ingrediente: [] }));
    // this.control.push(<FormArray>this.form.controls['ingredientes']);
    // console.log(this)    
  }

  // eliminarIngrediente(index: number) {
  //   //(<FormArray>this.form.controls['ingredientes']).removeAt(index);
  //   const control = <FormArray>this.form.controls['ingredientes'];
  //   control.removeAt(index);
  // }

  eliminarIngredientes(ingrediente: Ingredientes) {
    this.ingredienteService.eliminaIngrediente(ingrediente).then(() => {
      this.snackbar.open('Ingrediente eliminado', 'AVISO', {
        duration: 3000,
      });
    });
  }

}