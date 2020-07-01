import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { InicioMovilService } from 'src/app/_service/inicio-movil.service';
import { InicioMovil } from 'src/app/_model/inicio';

@Component({
  selector: 'app-crear-inicio',
  templateUrl: './crear-inicio.component.html',
  styleUrls: ['./crear-inicio.component.css']
})
export class CrearInicioComponent implements OnInit {

  //variables para capturar los datos 
  id: string;
  edicion: boolean;
  form: FormGroup;
  //variables para cargar la imagen
  archivo: any;
  labelFile: string;
  urlImagen: string;

  base64textString: any;

  constructor(
    public dialogRef: MatDialogRef<CrearInicioComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private inicioService: InicioMovilService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(''),
      'nombre': new FormControl(''),
      'estado': new FormControl(true),
      'imagen': new FormControl(''),
      'plataforma': new FormControl(''),
      // 'precio': new FormControl(''),
      // 'observacion': new FormControl('')
      
    });
  }

  accionCrear() {
    let pagInicio = new InicioMovil;
    pagInicio.id = this.afs.createId();
    pagInicio.nombre = this.form.value['nombre'];
    pagInicio.estado = true;
    pagInicio.plataforma = this.form.value['plataforma'];
    pagInicio.imagen = this.base64textString;
    // publi.precio = this.form.value['precio'];
    // publi.observacion = this.form.value['observacion'];
    

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`pagInicio/${pagInicio.id}`);
      ref.put(this.archivo);
    }

    this.inicioService.crear(pagInicio);
    this.snackbar.open('INFORMACION REGISTRADA', 'AVISO', {
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
  }

}
