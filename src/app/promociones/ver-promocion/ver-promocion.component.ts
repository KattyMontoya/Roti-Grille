import { Component, OnInit, Inject } from '@angular/core';
import { Promociones } from 'src/app/_model/promociones';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ver-promocion',
  templateUrl: './ver-promocion.component.html',
  styleUrls: ['./ver-promocion.component.css']
})
export class VerPromocionComponent implements OnInit {

  promocion: Promociones;

  constructor(
    public dialogRef: MatDialogRef<VerPromocionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Promociones,
  ) { }

  ngOnInit() {
    this.promocion = new Promociones();
    this.promocion.nombre = this.data.nombre;
    this.promocion.imagen = this.data.imagen; 
    this.promocion.detalle = this.data.detalle;
    console.log(this.data);
  }

  cerrar(): void {
    this.dialogRef.close();
  
  }

}
