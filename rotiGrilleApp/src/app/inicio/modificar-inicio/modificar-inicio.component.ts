import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InicioMovil } from 'src/app/_model/inicio';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PublicidadService } from 'src/app/_service/publicidad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { InicioMovilService } from 'src/app/_service/inicio-movil.service';

@Component({
  selector: 'app-modificar-inicio',
  templateUrl: './modificar-inicio.component.html',
  styleUrls: ['./modificar-inicio.component.css']
})
export class ModificarInicioComponent implements OnInit {

  id: string;
  form: FormGroup;
  edicion: boolean;
  inicio: InicioMovil;

  archivo: any;
  labelFile: string;
  urlImagen: string;
  base64textString: any;

  constructor(
    public dialogRef: MatDialogRef<ModificarInicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InicioMovil,
    private inicioService: InicioMovilService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.inicio = new InicioMovil();
    this.inicio.id = this.data.id;
    this.inicio.nombre = this.data.nombre;
    this.inicio.plataforma = this.data.plataforma;
    this.inicio.estado = this.data.estado;
    this.inicio.imagen = this.data.imagen;
    // this.publicidad.precio = this.data.precio;    
    // this.publicidad.observacion = this.data.observacion;    

    if (this.data.id != null) {
      this.afStorage.ref(`inicio/${this.data.id}`).getDownloadURL().subscribe(data => {
        this.urlImagen = data;
      })
    }
  }

  accionModificar() {
    let inicioMod = new InicioMovil();
    inicioMod.id = this.inicio.id;
    inicioMod.nombre = this.inicio.nombre;
    inicioMod.plataforma = this.inicio.plataforma;
    inicioMod.estado = this.inicio.estado;
    // publiMod.precio = this.promocion.precio;
    inicioMod.imagen = this.inicio.imagen;

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`pagInicio/${inicioMod.id}`);
      ref.put(this.archivo);
      inicioMod.imagen = this.base64textString;
    }

    this.inicioService.modificar(inicioMod);
    this.snackbar.open('INFORMACION MODIFICADA', 'AVISO', {
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
