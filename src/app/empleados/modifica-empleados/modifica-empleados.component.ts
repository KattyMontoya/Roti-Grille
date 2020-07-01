import {User} from '../../_model/user';
import {UserService} from '../../_service/user.service';
import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';
import { PerfilService } from 'src/app/_service/perfil.service';

@Component({
  selector: 'app-modifica-empleados',
  templateUrl: './modifica-empleados.component.html',
  styleUrls: ['./modifica-empleados.component.css']
})
export class ModificaEmpleadosComponent implements OnInit {

  id: string;
  form: FormGroup;
  edicion: boolean;
  user: User;

  archivo: any;
  labelFile: string;
  urlImagen:string;

  dataUser: User;
  dataPerfiles: any;
  foto: string = '';
  estado: string = '';
  perfiles_subs: Subscription;


  constructor(
    public dialogRef: MatDialogRef<ModificaEmpleadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,    
    private afs : AngularFirestore,
    private afStorage: AngularFireStorage,
    private perfilService: PerfilService,
    ) { }

  ngOnInit() {
    this.user = new User();
    this.user.id = this.data.id;
    this.user.apellido = this.data.apellido;
    this.user.nombre = this.data.nombre;
    this.user.cedula = this.data.cedula;
    this.user.email = this.data.email;
    this.user.celular = this.data.celular;
    this.user.direccion = this.data.direccion;
    this.user.perfil = this.data.perfil;

    if(this.data.id != null){
      this.afStorage.ref(`empleados/${this.data.id}`).getDownloadURL().subscribe(data=>{
        this.urlImagen = data;
      })
    }
    
    this.getDataPerfiles();
  }

  accionModificarEmp() {
    // if (this.estado === 'true') this.dataUser.estado = true;
    // if (this.estado === 'false') this.dataUser.estado = false;

    let userMod = new User();
    userMod.id = this.user.id;
    userMod.apellido = this.user.apellido;
    userMod.nombre = this.user.nombre;
    userMod.cedula = this.user.cedula;
    userMod.email = this.user.email;
    userMod.direccion = this.user.direccion;
    userMod.celular = this.user.celular;
    userMod.perfil = this.user.perfil;

    if (this.archivo != null){
      let ref = this.afStorage.ref(`empleados/${userMod.id}`);
      ref.put(this.archivo);
    }

    this.userService.modificar(userMod);
    this.snackbar.open('EMPLEADO   MODIFICADO', 'AVISO', {
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

  }

  ngOnDestroy() {
    this.perfiles_subs.unsubscribe();
    console.log('Destroy subscription');
  }

  async getDataPerfiles() {
    console.log('Ingresa');

    this.perfiles_subs = this.perfilService.getPerfiles().subscribe(data => {
      console.log('Perfiles', data);
      this.dataPerfiles = data;
    });

  }

  //Validaciones
  soloNumeros(e) {
    let key = window.event ? e.which : e.keyCode
    return (key >= 48 && key <= 57 || key == 8);
  }

  soloLetras(e) {
    let key = window.event ? e.which : e.keyCode
    return (key >= 65 && key <= 90 || key >= 97 && key <= 122 || key == 8)
  }

}
