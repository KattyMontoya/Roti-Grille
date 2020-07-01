import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Publicidad } from 'src/app/_model/publicidad';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PublicidadService } from 'src/app/_service/publicidad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-modifica-publicidad',
  templateUrl: './modifica-publicidad.component.html',
  styleUrls: ['./modifica-publicidad.component.css']
})
export class ModificaPublicidadComponent implements OnInit {

  id: string;
  form: FormGroup;
  edicion: boolean;
  publicidad: Publicidad;

  archivo: any;
  labelFile: string;
  urlImagen:string;
  base64textString: any;

  constructor(
    public dialogRef: MatDialogRef<ModificaPublicidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Publicidad,
    private publiService: PublicidadService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.publicidad = new Publicidad();
    this.publicidad.id = this.data.id;
    this.publicidad.nombre = this.data.nombre;
    this.publicidad.detalle = this.data.detalle;    
    this.publicidad.estado = this.data.estado;    
    this.publicidad.imagen = this.data.imagen;    
    // this.publicidad.precio = this.data.precio;    
    // this.publicidad.observacion = this.data.observacion;    

    if(this.data.id != null){
      this.afStorage.ref(`publicidad/${this.data.id}`).getDownloadURL().subscribe(data=>{
        this.urlImagen = data;
      })
    }
  }

  accionModificar() {
    let publiMod = new Publicidad();
    publiMod.id = this.publicidad.id;
    publiMod.nombre = this.publicidad.nombre;
    publiMod.detalle = this.publicidad.detalle;
    publiMod.estado = this.publicidad.estado;
    // publiMod.precio = this.promocion.precio;
    publiMod.imagen = this.publicidad.imagen;

    if (this.archivo != null){
      let ref = this.afStorage.ref(`publicidad/${publiMod.id}`);
      ref.put(this.archivo);
      publiMod.imagen = this.base64textString;
    }

    this.publiService.modificar(publiMod);
    this.snackbar.open('PUBLICIDAD MODIFICADA', 'AVISO', {
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
