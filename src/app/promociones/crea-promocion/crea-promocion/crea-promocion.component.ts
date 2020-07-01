import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PromocionesService } from 'src/app/_service/promociones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Promociones } from 'src/app/_model/promociones';

@Component({
  selector: 'app-crea-promocion',
  templateUrl: './crea-promocion.component.html',
  styleUrls: ['./crea-promocion.component.css']
})
export class CreaPromocionComponent implements OnInit {

  //variables para capturar los datos 
  id: string;
  edicion: boolean;
  form: FormGroup;
  //variables para cargar la imagen del plato
  archivo: any;
  labelFile: string;
  urlImagen: string;

  base64textString: any;

  constructor(
    public dialogRef: MatDialogRef<CreaPromocionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private promocionService: PromocionesService,
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
      'detalle': new FormControl(''),
      'estado': new FormControl(true),
      'imagen': new FormControl(''),
      'precio': new FormControl(0,
        [Validators.required,
        Validators.maxLength(5),
        Validators.min(0),
        Validators.pattern("^[0-9]+(.[0-9]{0,2})?$"),
        Validators.max(100)]),
      'observacion': new FormControl('')

    });
  }

  accionCrear() {
    let promocion = new Promociones;
    promocion.id = this.afs.createId();
    promocion.nombre = this.form.value['nombre'];
    promocion.detalle = this.form.value['detalle'];
    promocion.estado = true;
    promocion.imagen = this.base64textString;
    promocion.precio = this.form.value['precio'];
    promocion.observacion = this.form.value['observacion'];


    if (this.archivo != null) {
      let ref = this.afStorage.ref(`promocion/${promocion.id}`);
      ref.put(this.archivo);
    }

    this.promocionService.creacionPlato(promocion);
    this.snackbar.open('PROMOCION REGISTRADA', 'AVISO', {
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
