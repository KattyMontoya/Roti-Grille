import { Component, OnInit } from '@angular/core';
import { EncabezadoAdminComponent } from '../encabezado-admin/encabezado-admin.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../_service/auth-firebase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'firebaseLogin';

  selectedVal: string;
  responseMessage: string = '';
  responseMessageType: string = '';
  emailInput: string;
  passwordInput: string;
  nameInput: string;
  isForgotPassword: boolean;
  isVerified: boolean;
  userDetails: any;

  constructor(private authService: AuthenticationService, private router: Router, private snackbar: MatSnackBar) {
    this.selectedVal = 'login';
    this.isForgotPassword = false;
    this.isVerified = false;

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
    this.userDetails = this.authService.isUserLoggedIn()
  }

  // Login user with  provided Email/ Password
  loginUser() {
    this.responseMessage = "";
    this.authService.login(this.emailInput, this.passwordInput)
      .then(res => {
        console.log(res);
        this.showMessage("success", "¡Ingreso Exitoso!");
        this.isUserLoggedIn();
        this.router.navigate(['/homeAdmin']);
      }, err => {
        this.showMessage("danger", "El correo o la contraseña no coinciden.");
      });
  }

  // Register user with  provided Email/ Password
  registerUser() {
    this.authService.signUpWithEmail(this.emailInput, this.passwordInput).then(res => {
      this.router.navigate(['/login']);
      // Send Varification link in email
      this.authService.sendEmailVerification().then(res => {
        console.log(res);
        this.isForgotPassword = false;
        // this.isUserLoggedIn();
        // this.showMessage( "danger","Registro Exitoso!");
        // this.router.navigate(['/login']);
      }, err => {
        this.showMessage("danger", err.message);
      });
      this.isUserLoggedIn();
      this.router.navigate(['/registro']);
      this.showMessage("success", "Registro Exitoso");
      this.snackbar.open('Registrado! Por favor verifica tu correo', 'AVISO', {
        duration: 3000
      });

    }, err => {
      this.showMessage("danger", "El correo o contraseña no cumple el formato correcto!");
      // this.snackbar.open('EL CORREO NO CUMPLE EL FORMATO CORRECTO', 'AVISO', {
      //   duration: 3000
      // });
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
        this.showMessage("danger", err.message);
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

}
