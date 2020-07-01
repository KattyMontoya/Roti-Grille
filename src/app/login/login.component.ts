import { Component, OnInit } from '@angular/core';
import { EncabezadoAdminComponent } from '../encabezado-admin/encabezado-admin.component';
import { Router } from '@angular/router';
import { MenuService } from '../_service/menu.service';
import { FcmService } from '../_service/fcm.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../_service/auth-firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'firebaseLogin';

  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  nameInput: string;
  isForgotPassword: boolean;
  userDetails: any;
  public iniciado: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private menuService: MenuService,
    private fcmService: FcmService,
    private angularFireAuth: AngularFireAuth,
    ) {
    this.selectedVal = 'login';
    this.isForgotPassword = false;

    // this.authService.isAuth().subscribe(
    //   data=>{
    //     //console.log(data.email);
    //     this.onLoginRedirect();
   
    //   },
    //   error=>{
    //     console.log(error);
    //   }
    // );

  }

  ngOnInit() {
  }

  // Comman Method to Show Message and Hide after 2 seconds
  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  // Called on switching Login/ Register tabs
  public onValChange(val: string) {
    this.showMessage("", "");
    this.selectedVal = val;
  }

  // Check localStorage is having User Data
  isUserLoggedIn() {
    this.userDetails = this.authService.isUserLoggedIn();
    console.log('userDetail', this.userDetails);
  }

  // SignOut Firebase Session and Clean LocalStorage
  logoutUser() {
    this.authService.cerrarSesion()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
      }, err => {
        this.showMessage("danger", err.message);
      });
  }

  async sendEmailVerification() {
    console.log('send email');
    console.log(localStorage.getItem('user'));
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  // Login user with  provided Email/ Password
  loginUser() {
    //this.responseMessage = "";
    this.authService.login(this.emailInput, this.passwordInput).then(res => {
      if (this.angularFireAuth.auth.currentUser.emailVerified != true) {
        this.sendEmailVerification();
        window.alert('Validar su correo');
      } else {
        if (this.emailInput == 'carlos.rotigrille@gmail.com'){
          console.log('admin');
          this.angularFireAuth.authState.subscribe(userResponse => {
            console.log('localStorage.setItem admin', userResponse);
            if (userResponse) {
              localStorage.setItem('user', JSON.stringify(userResponse));
            }
          })
          this.router.navigate(['/homeAdmin']);
          this.showMessage("success", "¡Ingreso Exitoso!");
          this.isUserLoggedIn();
          this.fcmService.getPermission('fcm');
          console.log('res?', res);
          return;
        } else {
          console.log('empleado');
          this.angularFireAuth.authState.subscribe(userResponse => {
            console.log('localStorage.setItem empleado', userResponse);
            if (userResponse) {
              localStorage.setItem('user', JSON.stringify(userResponse));
            }
          })
          this.router.navigate(['/ordenes']);
          this.showMessage("success", "¡Ingreso Exitoso!");
          this.isUserLoggedIn();
          this.fcmService.getPermission('fcm');
          console.log('res?', res);
          return;
        }
      }
      
        // if (this.angularFireAuth.auth.currentUser.emailVerified != true) {
        //   this.sendEmailVerification();
        //   window.alert('Validar su correo');
        // } else {
        //   this.router.navigate(['/homeAdmin']);
        //   this.showMessage("success", "¡Ingreso Exitoso!");
        //   this.isUserLoggedIn();
        //   this.fcmService.getPermission('fcm');
        // }
      /*this.router.navigate(['/homeAdmin']);
      this.showMessage("success", "¡Ingreso Exitoso!");
      this.isUserLoggedIn();
      this.fcmService.getPermission('fcm');*/
        
        
      }, err => {
        this.showMessage("danger", "El correo o la contraseña no coinciden.");
      });
  }

  // Register user with  provided Email/ Password
  registerUser() {
    this.authService.signUpWithEmail(this.emailInput, this.passwordInput)
      .then(res => {

        // Send Varification link in email
        this.authService.sendEmailVerification().then(res => {
          console.log(res);
          this.isForgotPassword = false;
          this.showMessage("success", "Registro Exitoso! Por favor verifica tu correo");

          // await this.router.navigate(['/login']);
        }, err => {
          this.showMessage("danger", err.message);
        });
        this.isUserLoggedIn();
        this.router.navigate(['/login']);


      }, err => {
        this.showMessage("danger", err.message);
      });
  }

  // Send link on given email to reset password
  forgotPassword() {
    this.authService.sendPasswordResetEmail(this.emailInput)
      .then(res => {
        console.log(res);
        this.isForgotPassword = false;
        this.showMessage("success", "Por favor revisa tu correo");
      }, err => {
        this.showMessage("danger", "Correo no encontrado o eliminado!");
      });
  }

  // Open Popup to Login with Google Account
  googleLogin() {
    this.authService.loginWithGoogle()
      .then(res => {
        console.log(res);
        this.showMessage("success", "Successfully Logged In with Google");
        this.isUserLoggedIn();
      }, err => {
        this.showMessage("danger", err.message);
      });
  }

  //Menu dinamico
  listarMenu() {
    this.menuService.listar().subscribe(data => {
      this.menuService.menuCambio.next(data);
      //this.router.navigate(['/homeAdmin']);
    })
  }

}