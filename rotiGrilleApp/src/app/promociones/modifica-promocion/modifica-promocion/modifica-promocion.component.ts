import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Promociones } from 'src/app/_model/promociones';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PromocionesService } from 'src/app/_service/promociones.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-modifica-promocion',
  templateUrl: './modifica-promocion.component.html',
  styleUrls: ['./modifica-promocion.component.css']
})
export class ModificaPromocionComponent implements OnInit {

  id: string;
  form: FormGroup;
  edicion: boolean;
  promocion: Promociones;
  precioError: boolean;

  archivo: any;
  labelFile: string;
  urlImagen: string;
  base64textString: any;

  review_btn: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModificaPromocionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Promociones,
    private route: ActivatedRoute,
    private promocionService: PromocionesService,
    private router: Router,
    private snackbar: MatSnackBar,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
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

    this.promocion = new Promociones();
    this.promocion.id = this.data.id;
    this.promocion.nombre = this.data.nombre;
    this.promocion.detalle = this.data.detalle;
    this.promocion.estado = this.data.estado;
    this.promocion.imagen = this.data.imagen;
    this.promocion.precio = this.data.precio;
    this.promocion.observacion = this.data.observacion;

    if (this.data.id != null) {
      this.afStorage.ref(`promocion/${this.data.id}`).getDownloadURL().subscribe(data => {
        this.urlImagen = data;
      })
    }
  }

  accionModificar() {
    let promocionMod = new Promociones();
    promocionMod.id = this.promocion.id;
    promocionMod.nombre = this.promocion.nombre;
    promocionMod.detalle = this.promocion.detalle;
    promocionMod.estado = this.promocion.estado;
    promocionMod.precio = this.promocion.precio;
    if (promocionMod.precio < 0 || promocionMod.precio > 100) {
      this.precioError = true;
    } else {
      this.precioError = false;
    }
    promocionMod.imagen = this.promocion.imagen;
    // promocionMod.imagen = this.base64textString;

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`promocion/${promocionMod.id}`);
      ref.put(this.archivo);
      promocionMod.imagen = this.base64textString;
    }

    if (this.precioError != true) {
      this.promocionService.modificar(promocionMod);
      this.snackbar.open('PROMOCION MODIFICADA', 'AVISO', {
        duration: 3000
      });

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


}
