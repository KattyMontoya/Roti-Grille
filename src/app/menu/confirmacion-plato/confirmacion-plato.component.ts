import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Plato } from 'src/app/_model/plato';
import { PlatoService } from 'src/app/_service/plato.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { IngredientesService } from 'src/app/_service/ingredientes.service';

@Component({
  selector: 'app-confirmacion-plato',
  templateUrl: './confirmacion-plato.component.html',
  styleUrls: ['./confirmacion-plato.component.css']
})
export class ConfirmacionPlatoComponent implements OnInit {

  public plato: any;
  urlImagen: string;
  // public idPlato: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionPlatoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plato,
    private platoService: PlatoService,
    private snackbar: MatSnackBar,
    private afStorage: AngularFireStorage,
    private ingredienteService: IngredientesService
  ) { }

  ngOnInit() {
    console.log('Plato a borrar', this.data);
  }

  borrarPlato(){
    this.plato = new Plato();
    this.plato.id = this.data.id;
    // this.idPlato = this.plato.id;
    // this.cargaTablaIngredientes();
    // this.form = new FormGroup({
    //   'ingrediente': new FormControl('')
    // });
    this.plato.nombre = this.data.nombre;
    this.plato.precio = this.data.precio;
    this.plato.categoria = this.data.categoria;
    this.plato.detalle = this.data.detalle;
    this.plato.imagen = this.data.imagen;
    this.plato.estado = this.data.estado;
    this.plato.ingredientes = this.data.ingredientes;

    if (this.data.id != null) {
      this.afStorage.ref(`platos/${this.data.id}`).getDownloadURL().subscribe(data => {
        this.urlImagen = data;
      })
    }

    this.ingredienteService.eliminaIngredienteDesdeMenu(this.plato.ingredientes);
    this.platoService.eliminar(this.plato).then(() => {
      this.snackbar.open('Se elimino el registro', 'AVISO', {
        duration: 3000,
      });
    });

    this.cancelarAccionPlato();

  }

  cancelarAccionPlato(){
    this.dialogRef.close();
  }

}
