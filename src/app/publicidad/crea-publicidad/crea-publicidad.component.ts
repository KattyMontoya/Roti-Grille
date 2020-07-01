import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { PublicidadService } from 'src/app/_service/publicidad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Publicidad } from 'src/app/_model/publicidad';

@Component({
  selector: 'app-crea-publicidad',
  templateUrl: './crea-publicidad.component.html',
  styleUrls: ['./crea-publicidad.component.css']
})
export class CreaPublicidadComponent implements OnInit {

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
    public dialogRef: MatDialogRef<CreaPublicidadComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private publiService: PublicidadService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  ngOnInit()
  {
    this.form = new FormGroup({
      'id': new FormControl(''),
      'nombre': new FormControl(''),
      'detalle': new FormControl(''),
      'estado': new FormControl(true),
      'imagen': new FormControl(''),
      // 'precio': new FormControl(''),
      // 'observacion': new FormControl('')
      
    });
  }

  accionCrear() {
    let publi = new Publicidad;
    publi.id = this.afs.createId();
    publi.nombre = this.form.value['nombre'];
    publi.detalle = this.form.value['detalle'];
    publi.estado = true;
    publi.imagen = this.base64textString;
    // publi.precio = this.form.value['precio'];
    // publi.observacion = this.form.value['observacion'];
    

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`publicidad/${publi.id}`);
      ref.put(this.archivo);
    }

    this.publiService.creacionPubli(publi);
    this.snackbar.open('PUBLICIDAD REGISTRADA', 'AVISO', {
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

}
