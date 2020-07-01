import { Component, OnInit, Inject } from '@angular/core';
import { Sugerencias } from 'src/app/_model/sugerencias';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FcmService } from 'src/app/_service/fcm.service';
import { SugerenciasService } from 'src/app/_service/sugerencias.service';

@Component({
  selector: 'app-ver-opinion',
  templateUrl: './ver-opinion.component.html',
  styleUrls: ['./ver-opinion.component.css']
})
export class VerOpinionComponent implements OnInit {

  sugerencia: Sugerencias;
  response: Sugerencias;
  token: String;
  // snackbar: any;

  constructor(
    public dialogRef: MatDialogRef<VerOpinionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sugerencias,
    private fcmService: FcmService,
    private sugerenciaService: SugerenciasService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.sugerencia = new Sugerencias();
    this.sugerencia.id = this.data.id;
    this.sugerencia.detalle = this.data.detalle;
    this.sugerencia.tipo = this.data.tipo;
    this.sugerencia.mensaje = this.data.mensaje;
    this.sugerencia.uid_mesa = this.data.uid_mesa.trim();
  }
  
  responderOpinion() {
    this.response = new Sugerencias();
    this.response.id = this.sugerencia.id;
    this.response.detalle = this.sugerencia.detalle;
    this.response.tipo = this.sugerencia.tipo;
    this.response.mensaje = this.sugerencia.mensaje;
    this.response.uid_mesa = this.sugerencia.uid_mesa.trim();
    // this.token = this.sugerencia.token.trim();

    // if (this.token.trim()) {
    //   console.log('Respuesta Sugerencia');
    //   const title = 'Gracias';
    //   const sms = this.sugerencia.mensaje;
    //   this.fcmService.sendPostRequest_Notification(title, sms, this.token.trim());
    // }

    //console.log('mandado a produccion', this.pedidoProduccion);
    this.sugerenciaService.modificar(this.response);

    // this.pedidosEnt.updatePedido(this.pedidoNuevo, this.pedidoNuevo.id).then(() => {
    //   console.log('Update user...');
    // }).catch(error => console.log('Error update user..', error));
    this.snackbar.open('NOTIFICACION ENVIADA', 'AVISO', {
      duration: 3000
    });

    this.cerrar();
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}
