import { Component, OnInit, Inject } from '@angular/core';
import { Promociones } from 'src/app/_model/promociones';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PromocionesService } from 'src/app/_service/promociones.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-confirmacion-promocion',
  templateUrl: './confirmacion-promocion.component.html',
  styleUrls: ['./confirmacion-promocion.component.css']
})
export class ConfirmacionPromocionComponent implements OnInit {

  public promocion: any;
  urlImagen: string;

  constructor(
  public dialogRef: MatDialogRef<ConfirmacionPromocionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Promociones,
    private promocionService: PromocionesService,
    private snackbar: MatSnackBar,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }

  borrarPromo(){
    this.promocion = new Promociones();
    this.promocion.id = this.data.id;
    this.promocion.nombre = this.data.nombre;
    this.promocion.detalle = this.data.detalle;    
    this.promocion.estado = this.data.estado;    
    this.promocion.imagen = this.data.imagen;    
    this.promocion.precio = this.data.precio;    
    this.promocion.observacion = this.data.observacion;    

    if(this.data.id != null){
      this.afStorage.ref(`promocion/${this.data.id}`).getDownloadURL().subscribe(data=>{
        this.urlImagen = data;
      })
    }

    this.promocionService.eliminar(this.promocion).then(() => {
        this.snackbar.open('Se elimino el registro', 'AVISO', {
          duration: 3000,
        });
      });

      this.cancelarAccionPromo();

  }

  cancelarAccionPromo(){
    this.dialogRef.close()
  }

}
