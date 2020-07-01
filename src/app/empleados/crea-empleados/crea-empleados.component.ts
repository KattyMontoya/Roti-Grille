import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../_model/user';
import { UserService } from 'src/app/_service/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { PerfilService } from 'src/app/_service/perfil.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/_model/usuario';
import { AuthenticationService } from 'src/app/_service/auth-firebase.service';


@Component({
  selector: 'app-crea-empleados',
  templateUrl: './crea-empleados.component.html',
  styleUrls: ['./crea-empleados.component.css']
})
export class CreaEmpleadosComponent implements OnInit {

  //variables para capturar los datos 
  id: string;
  edicion: boolean;
  form: FormGroup;
  //variables para cargar la imagen del empleado
  archivo: any;
  labelFile: string;
  urlImagen: string;

  public usuario = new User();
  public cedulaUsuario: any;
  emailInput: string;
  passwordInput: string;
  public permite: boolean;
  public cedulaDuplicada: boolean;
  public cedulaConsultada: any;
  public correoDuplicada: boolean;
  // let lettersRegexp = /^[A-Za-z]+$/;
  // let numberRegexp = /^[0-9]+$/;
  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  nameInput: string;
  isForgotPassword: boolean;
  userDetails: any;

  constructor(
    public dialogRef: MatDialogRef<CreaEmpleadosComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private perfilService: PerfilService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(''),
      'cedula': new FormControl(''),
      'nombre': new FormControl(''),
      'apellido': new FormControl(''),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'celular': new FormControl(''),
      'direccion': new FormControl(''),
      'estado': new FormControl(true),
      'perfil': new FormControl(''),
    });
    this.getDataPerfiles();
  }

  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  accionCrearEmp() {
    // this.usuario = new User;
    this.usuario.id = this.afs.createId();
    this.usuario.apellido = this.form.value['apellido'];
    this.usuario.nombre = this.form.value['nombre'];
    this.usuario.cedula = this.form.value['cedula'];
    this.cedulaUsuario = this.usuario.cedula;
    this.usuario.email = this.form.value['email'];
    //this.validaCorreoRepetido(this.usuario.email);
    this.usuario.celular = this.form.value['celular'];
    this.usuario.direccion = this.form.value['direccion'];
    this.usuario.estado = true;
    this.usuario.perfil = 'O84lNoQAdvst0LNzOZM8';
    // this.usuario.perfil = this.form.value['perfil'];

    if (this.archivo != null) {
      let ref = this.afStorage.ref(`empleados/${this.usuario.id}`);
      ref.put(this.archivo);
    }

    this.validaCedulaRepetida();
  }


  validaCedulaRepetida() {
    console.log('cedula pasada', this.cedulaUsuario);
    const dat = this.userService.validaCedula(this.cedulaUsuario).subscribe(data => {
      let cedulaRepetida = [];
      data.forEach((dato: any) => {
        let usuarioCed = new User();
        usuarioCed.id = dato.payload.doc.id;
        usuarioCed.cedula = dato.payload.doc.data().cedula;
        cedulaRepetida.push(usuarioCed);
      });
      dat.unsubscribe();
      console.log('array de dupicados', cedulaRepetida);
      if (cedulaRepetida.length == 0) {
        console.log('retorno false');
        // this.cedulaDuplicada = false;
        this.creandoUsuario();
        // return this.cedulaDuplicada;
      } else {
        console.log('retorno verdadero');
        // this.cedulaDuplicada = true;
        this.snackbar.open('CEDULA YA EN USO', 'AVISO', {
          duration: 3000
        });
        // return this.cedulaDuplicada;
      }
    });
  }

  creandoUsuario() {
    this.userService.creacionUser(this.usuario);
    localStorage.setItem('perfil', 'empleado');
    this.authService.signUpWithEmail(this.usuario.email, this.usuario.cedula)

    this.snackbar.open('EMPLEADO REGISTRADO', 'AVISO', {
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

  dataPerfiles: any;
  userForm: FormGroup;
  perfiles_subs: Subscription;

  // public users = [];

  // id: string;
  cedula: string = ''
  // nombre: string;
  // apellido: string;
  // direccion: string;
  // email: string;
  foto: string = '';
  cargo: string = '';
  // celular: number;
  // estado: boolean = true;
  // perfil: string;


  ngOnDestroy() {
    this.perfiles_subs.unsubscribe();
    console.log('Destroy subscription');
  }

  // createUser (userData: User){
  //   this.userService.createUser(userData);
  // }

  cancelarEmpleado(): void {
    this.dialogRef.close();
  }

  getDataPerfiles() {
    console.log('Ingresa');
    this.perfiles_subs = this.perfilService.getPerfiles().subscribe(data => {
      console.log('Perfiles', data);
      this.dataPerfiles = data;
    });

  }


  //Validaciones
  soloNumeros(e) {
    let key = window.event ? e.which : e.keyCode
    return (key >= 48 && key <= 57 || key == 8 || key == 9)
  }

  soloLetras(e) {
    let key = window.event ? e.which : e.keyCode
    return (key >= 65 && key <= 90 || key >= 97 && key <= 122 || key == 8 || key == 9)
  }

  get primEmail() {
    return this.form.get('email')
  }

}


