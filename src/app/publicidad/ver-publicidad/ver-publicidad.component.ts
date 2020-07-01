import { Component, OnInit, Inject } from '@angular/core';
import { Publicidad } from 'src/app/_model/publicidad';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ver-publicidad',
  templateUrl: './ver-publicidad.component.html',
  styleUrls: ['./ver-publicidad.component.css']
})
export class VerPublicidadComponent implements OnInit {

  publicidad: Publicidad;

  constructor(
    public dialogRef: MatDialogRef<VerPublicidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Publicidad,
  ) { }

  ngOnInit() {
    this.publicidad = new Publicidad();
    this.publicidad.nombre = this.data.nombre;
    this.publicidad.imagen = this.data.imagen; 
    this.publicidad.detalle = this.data.detalle;
    console.log(this.data);
  }

  cerrar(): void {
    this.dialogRef.close();
  
  }

}
