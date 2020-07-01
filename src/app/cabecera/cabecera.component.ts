import { Component, OnInit, Inject } from '@angular/core';
import { MenuService } from '../_service/menu.service'
import { Menu } from '../_model/menu';
import { UserService } from '../_service/user.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  
  userDetails: any;
                                                                                                                       
  constructor(private menuService: MenuService, public loginService: AuthenticationService, 
    private angularFireAuth: AngularFireAuth, private router: Router, public perfilUserService: UserService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,) { }

  menu: Menu   
  perfiles_subs: Subscription;
  dataPerfiles : any;
  public logueado: any;
  public esIniciado: boolean;

  ngOnInit() {
    //this.logueado = this.loginService.user;
    // console.log('iniciado?', this.logueado);
    // if (this.logueado == null || this.logueado == undefined){
    //   this.esIniciado = false;
    // }else{
    //   this.esIniciado = true;
    // }
    // console.log('esta iniciado?', this.esIniciado);

    // this.menu.icono = this.data.icono;
    // this.menu.nombre = this.data.nombre;
    // this.menu.url = this.data.url;

    // this.menuService.listar().subscribe(data =>{
    //   //this.menuService.menuCambio.next(data);
    //   console.log(data);
    // });
  }
  // modificarEmp(user: User) {
  //   this.dialog.open(VerPerfilComponent, {
  //     data: user
  //   });
  // }

}
