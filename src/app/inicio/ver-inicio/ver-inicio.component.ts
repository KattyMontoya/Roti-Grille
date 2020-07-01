import { Component, OnInit, Inject } from '@angular/core';
import { InicioMovil } from 'src/app/_model/inicio';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ver-inicio',
  templateUrl: './ver-inicio.component.html',
  styleUrls: ['./ver-inicio.component.css']
})
export class VerInicioComponent implements OnInit {

  inicio: InicioMovil;

  constructor(
    public dialogRef: MatDialogRef<VerInicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InicioMovil,
  ) { }

  ngOnInit() {
    this.inicio = new InicioMovil();
    this.inicio.nombre = this.data.nombre;
    this.inicio.imagen = this.data.imagen; 
    this.inicio.plataforma = this.data.plataforma;
    console.log(this.data);
  }

  cerrar(): void {
    this.dialogRef.close();
  
  }

}
