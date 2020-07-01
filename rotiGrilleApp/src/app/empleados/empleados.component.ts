import { User } from '../_model/user';
import { UserService } from '../_service/user.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { CreaEmpleadosComponent } from '../empleados/crea-empleados/crea-empleados.component';
import { ModificaEmpleadosComponent } from '../empleados/modifica-empleados/modifica-empleados.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  urlImagen: string;
  public user: User;

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['cedula', 'nombresCompletos', /*'email',*/ 'celular', 'direccion', 'perfil', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private authService: AuthenticationService,
    private afStorage: AngularFireStorage, ) { }


  ngOnInit() {
    this.userService.listar().subscribe(data => {
      let empleado = [];
      data.forEach((dato: any) => {
        this.user = new User();
        this.user.id = dato.payload.doc.id;
        this.user.cedula = dato.payload.doc.data().cedula;
        this.user.apellido = dato.payload.doc.data().apellido;
        this.user.nombre = dato.payload.doc.data().nombre;
        this.user.email = dato.payload.doc.data().email;
        this.user.celular = dato.payload.doc.data().celular;
        this.user.direccion = dato.payload.doc.data().direccion;
        this.user.perfil = dato.payload.doc.data().perfil;
        // if(this.user.id != null){
        this.afStorage.ref(`empleados/${this.user.id}`).getDownloadURL().subscribe(imagen => {
          this.user.foto = imagen;
        });
        empleado.push(this.user);
        // }
      });
      this.dataSource = new MatTableDataSource(empleado);
      console.log('empleados-->', empleado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // this.afStorage.ref(`empleados/${this.dataSource.id}`).getDownloadURL().subscribe(data=>{
    //   this.urlImagen = data;
    // })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  creaEmpleado() {
    const dialogRef = this.dialog.open(CreaEmpleadosComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('Creando empleado...');
      }
    })
  }

  modificarEmp(user: User) {
    this.dialog.open(ModificaEmpleadosComponent, {
      data: user
    });
  }

  eliminarUsuario(user: User) {
    this.dialog.open(ConfirmacionComponent, {
      data: user
    });
    // this.userService.eliminar(user).then(() => {
    //   this.snackbar.open('Se elimino el registro', 'AVISO', {
    //     duration: 3000,
    //   });
    // });
  }

}
