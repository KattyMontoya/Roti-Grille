import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  public user: any;
  urlImagen:string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
   console.log('usuario a eliminar', this.data);
  }

  borrarUsuario() {
    // this.user = new User();
    // this.user.id = this.data.id;
    // this.user.apellido = this.data.apellido;
    // this.user.nombre = this.data.nombre;
    // this.user.cedula = this.data.cedula;
    // this.user.email = this.data.email;
    // this.user.celular = this.data.celular;
    // this.user.direccion = this.data.direccion;
    // this.user.perfil = this.data.perfil;

    // if(this.data.id != null){
    //   this.afStorage.ref(`empleados/${this.data.id}`).getDownloadURL().subscribe(data=>{
    //     this.urlImagen = data;
    //   })
    // }

    this.userService.eliminar(this.data).then(() => {
      this.snackbar.open('Se elimino el registro', 'AVISO', {
        duration: 3000,
      });
    });
    this.cancelarAccion();
  }

  cancelarAccion() {
    this.dialogRef.close();
  }

}
