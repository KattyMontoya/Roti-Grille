import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaService } from '../_service/categoria.service';
import { Categoria } from '../_model/categoria.interface';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public categoria: any;
  public nombreCategoria: string;
  form: FormGroup;
  archivo: any;
  labelFile: string;
  urlImagen: string;
  public cat: Categoria;
  // public categoriaDuplicada = [];
  public esDuplicado: boolean;
  public esCategoriaDuplicada: boolean;

  base64textString: any;
  constructor(
    public dialogRef: MatDialogRef<CategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(''),
      'nombre': new FormControl(''),
      'estado': new FormControl(true),
      'imagen': new FormControl('')

    });
  }

  validaCategoria(): any {
    console.log('categoria pasda', this.nombreCategoria);
    const dat = this.categoriaService.categoriaDuplicada(this.nombreCategoria).subscribe(data => {
      let categoriaDuplicada = [];
      data.forEach((dato: any) => {
        this.cat = new Categoria();
        this.cat.id = dato.payload.doc.id;
        this.cat.nombre = dato.payload.doc.data().nombre;
        categoriaDuplicada.push(this.cat);
      });
      dat.unsubscribe();
      console.log('array de duplicados', categoriaDuplicada);
      if (categoriaDuplicada.length == 0) {
        console.log('retorno falso');
        this.esDuplicado = false;
        this.creandoCategoria();
        return this.esDuplicado;
      } else {
        console.log('retorno verdadero');
        this.esDuplicado = true;
        this.snackbar.open('CATEGORIA YA EXISTE', 'AVISO', {
          duration: 3000
        });
        return this.esDuplicado;
      }
    });
  }

  accionCrear() {
    // let esCategoriaDuplicada: boolean;
    this.categoria = new Categoria;
    this.categoria.id = this.afs.createId();
    this.categoria.nombre = this.form.value['nombre'];
    this.nombreCategoria = this.categoria.nombre;
    this.categoria.estado = true;
    this.categoria.imagen = this.base64textString;


    if (this.archivo != null) {
      let ref = this.afStorage.ref(`categoria/${this.categoria.id}`);
      ref.put(this.archivo);
    }

    this.validaCategoria();
    // this.esCategoriaDuplicada = this.validaCategoria(categoria.nombre);
    // // this.esDuplicado = this.validaCategoria();
    // console.log('es categoria duplicada??', this.esDuplicado);
    // if (this.esDuplicado) {
    //   this.snackbar.open('CATEGORIA YA EXISTE', 'AVISO', {
    //     duration: 3000
    //   });
    // } else {
    //   // this.categoriaService.creacionCategoria(categoria);
    //   this.snackbar.open('CATEGORIA REGISTRADA', 'AVISO', {
    //     duration: 3000
    //   });

    //   // this.cerrar();
    // }
  }

  creandoCategoria() {
    this.categoriaService.creacionCategoria(this.categoria);
    this.snackbar.open('CATEGORIA REGISTRADA', 'AVISO', {
      duration: 3000
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

  soloLetras(e) {
    let key = window.event ? e.which : e.keyCode
    return (key >= 65 && key <= 90 || key >= 97 && key <= 122 || key == 8 || key == 32)
  }

}
