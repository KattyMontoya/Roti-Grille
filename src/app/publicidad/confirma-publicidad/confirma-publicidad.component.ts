import { Component, OnInit, Inject } from '@angular/core';
import { Publicidad } from 'src/app/_model/publicidad';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PublicidadService } from 'src/app/_service/publicidad.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-confirma-publicidad',
  templateUrl: './confirma-publicidad.component.html',
  styleUrls: ['./confirma-publicidad.component.css']
})
export class ConfirmaPublicidadComponent implements OnInit {

  public publicidad: any;
  urlImagen: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmaPublicidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Publicidad,
    private publiService: PublicidadService,
    private snackbar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  borrarPublicidad() {
    this.publicidad = new Publicidad();
    this.publicidad.id = this.data.id;
    this.publicidad.nombre = this.data.nombre;
    this.publicidad.detalle = this.data.detalle;
    this.publicidad.estado = this.data.estado;
    this.publicidad.imagen = this.data.imagen;
    // this.publicidad.precio = this.data.precio;    
    // this.publicidad.observacion = this.data.observacion;    

    if (this.data.id != null) {
      this.afStorage.ref(`publicidad/${this.data.id}`).getDownloadURL().subscribe(data => {
        this.urlImagen = data;
      })
    }

    this.publiService.eliminar(this.publicidad).then(() => {
      this.snackbar.open('Se elimino el registro', 'AVISO', {
        duration: 3000,
      });
    });

    this.cancelarAccionPublicidad();

  }

  cancelarAccionPublicidad(){
    this.dialogRef.close();
  }

}
