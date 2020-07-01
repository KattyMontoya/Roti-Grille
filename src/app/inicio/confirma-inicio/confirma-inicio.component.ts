import { Component, OnInit, Inject } from '@angular/core';
import { InicioMovil } from 'src/app/_model/inicio';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { InicioMovilService } from 'src/app/_service/inicio-movil.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-confirma-inicio',
  templateUrl: './confirma-inicio.component.html',
  styleUrls: ['./confirma-inicio.component.css']
})
export class ConfirmaInicioComponent implements OnInit {

  public inicio: any;
  urlImagen: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmaInicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InicioMovil,
    private inicioService: InicioMovilService,
    private snackbar: MatSnackBar,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  borrar() {
    this.inicio = new InicioMovil();
    this.inicio.id = this.data.id;
    this.inicio.nombre = this.data.nombre;
    this.inicio.plataforma = this.data.plataforma;
    this.inicio.estado = this.data.estado;
    this.inicio.imagen = this.data.imagen;
    // this.publicidad.precio = this.data.precio;    
    // this.publicidad.observacion = this.data.observacion;    

    if (this.data.id != null) {
      this.afStorage.ref(`pagInicio/${this.data.id}`).getDownloadURL().subscribe(data => {
        this.urlImagen = data;
      })
    }

    this.inicioService.eliminar(this.inicio).then(() => {
      this.snackbar.open('Se elimino el registro', 'AVISO', {
        duration: 3000,
      });
    });

    this.cancelar();

  }

  cancelar(){
    this.dialogRef.close();
  }

}
