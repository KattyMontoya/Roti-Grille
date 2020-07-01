import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { FormGroup, FormControl, FormArray, FormBuilder, FormGroupName, Validators } from '@angular/forms';
import { Plato } from 'src/app/_model/plato';
import { PlatoService } from 'src/app/_service/plato.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Subscription } from 'rxjs';
import { Ingredientes } from 'src/app/_model/ingredientes';
import { IngredientesService } from 'src/app/_service/ingredientes.service';

@Component({
  selector: 'app-crea-plato',
  templateUrl: './crea-plato.component.html',
  styleUrls: ['./crea-plato.component.css']
})
export class CreaPlatoComponent implements OnInit {

  //variables para capturar los datos 
  id: string;
  edicion: boolean;
  form: FormGroup;
  //i: FormArray;
  public control;
  //ingrediente: Ingredientes[]=[];
  public ingredientes = [];
  //variables para cargar la imagen del plato
  archivo: any;
  labelFile: string;
  urlImagen: string;
  base64textString: any;

  dataPerfiles: any;
  userForm: FormGroup;
  perfiles_subs: Subscription;

  nombre: string = '';
  imagen: string = '';
  categoria: string = '';

  dataSource: MatTableDataSource<Ingredientes>;
  displayedColumns = ['ingrediente', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public nuevoIngrediente: boolean = false;
  public idPlato: string;
  public nombrePlato: string;
  public plato = new Plato;
  public newIngrediente = new Ingredientes;

  constructor(
    public dialogRef: MatDialogRef<CreaPlatoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private platoService: PlatoService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private categoriaService: CategoriaService,
    private ingredienteService: IngredientesService
  ) { }

  ngOnInit() {
    this.plato.id = this.afs.createId();
    this.idPlato = this.plato.id;
    this.cargaTablaIngredientes();

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
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log('tabla Ingrediente', data);
    });
  }

  validaNombreRepetido() {
    console.log('nombre plato pasado', this.nombrePlato);
    const dat = this.platoService.vlidaNombre(this.nombrePlato).subscribe(data => {
      let nombresRepetidos = [];
      data.forEach((dato: any) => {
        let platoRepetido = new Plato();
        platoRepetido = dato.payload.doc.id;
        platoRepetido = dato.payload.nombre;
        nombresRepetidos.push(platoRepetido);
      });
      dat.unsubscribe();
      if (nombresRepetidos.length == 0) {
        console.log('Retrono falso');
        this.creandoPlato();
      } else {
        console.log('retorno verdadero');
        this.snackbar.open('NOMBRE YA EN USO', 'AVISO', {
          duration: 3000,
          // panelClass: ['mensaje-warning']
        });
      }
    })
  }

  accionCrear() {
    //this.ingrediente = this.control.value;  
    //console.log('ingrediente',this.ingrediente);
    //console.log('control',this.control.value);
    //let plato = new Plato;
    //this.plato.id = this.afs.createId();
    this.plato.nombre = this.form.value['nombre'];
    this.nombrePlato = this.plato.nombre;
    this.plato.precio = this.form.value['precio'];
    this.plato.categoria = this.form.value['categoria'];
    this.plato.id_categoria = this.form.value['categoria'];
    //this.plato.detalle = this.form.value['detalle'];
    this.plato.estado = true;
    this.plato.imagen = this.base64textString;
    this.plato.ingredientes = this.ingredientes;

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`platos/${this.plato.id}`);
      ref.put(this.archivo);
    }

    this.validaNombreRepetido();

    // this.idPlato = plato.id;
    // let ingrediente = new Ingredientes;
    // ingrediente.id = plato.id;
    // ingrediente.ingrediente = this.form.value['ingrediente'];


    //console.log('Plato-->',this.plato);
    // this.platoService.creacionPlato(this.plato);
    // this.snackbar.open('PLATO REGISTRADO', 'AVISO', {
    //   duration: 3000,
    //   panelClass: ['background-color: green;']
    // });

    // this.cerrar();

  }

  creandoPlato() {
    this.platoService.creacionPlato(this.plato);
    this.snackbar.open('PLATO REGISTRADO', 'AVISO', {
      duration: 3000,
      // panelClass: ['background-color: green;']
    });

    this.cerrar();
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

  getDataCategoria() {

    //console.log('Ingresa');
    this.perfiles_subs = this.categoriaService.getCategorias().subscribe(data => {
      //console.log('Categorias:', data);
      this.dataPerfiles = data;
    });
  }

  //INPUT DINAMICOS

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


  // get getIngredientes() {
  //   return this.form.get('ingredientes') as FormArray;
  // }

  anadirIngrediente() {
    this.nuevoIngrediente = true;
    // this.form = new FormGroup({
    //   'ingrediente': new FormControl('')
    // })
    // this.control = <FormArray>this.form.controls['ingredientes'];
    // this.control.push(this.fb.group({ ingrediente: [] }));
  }

  eliminarIngrediente(ingrediente: Ingredientes) {
    this.ingredienteService.eliminaIngrediente(ingrediente).then(() => {
      this.snackbar.open('Ingrediente eliminado', 'AVISO', {
        duration: 3000,
      });
    });
  }

}
