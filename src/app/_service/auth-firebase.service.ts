import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/_model/user';
import { Usuario } from 'src/app/_model/usuario';
import { Route } from '@angular/compiler/src/core';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Observable<Usuario>;
  public iniciado: boolean = false;
  responseMessage: string = '';
  responseMessageType: string = '';

  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = "";
    }, 2000);
  }

  constructor(
    private angularFireAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
  ) {
    // this.user = this.angularFireAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
    //     } else {
    //       return EMPTY;
    //     }
    //   })
    // )


  //   this.angularFireAuth.authState.subscribe(userResponse => {
  //     console.log('localStorage.setItem', userResponse);
  //     if (userResponse) {
  //       localStorage.setItem('user', JSON.stringify(userResponse));
  //     } else {
  //       localStorage.setItem('user', null);
  //     }
  //   })
  }

  async login(email: string, password: string) {
    
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('funcion login', res);
      //this.actualizarUsuarioData(res.user)
    });
  }

  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //     var displayName = user.displayName;
  //     var email = user.email;
  //     var emailVerified = user.emailVerified;
  //     var photoURL = user.photoURL;
  //     var isAnonymous = user.isAnonymous;
  //     var uid = user.uid;
  //     var providerData = user.providerData;
  //     // ...
  //   } else {
  //     // User is signed out.
  //     // ...
  //   }
  // });

  signUpWithEmail(email:any, pass:any)/*:Promise<firebase.auth.UserCredential>*/{
    // var user;
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email,pass);
    // user =  this.angularFireAuth.auth.currentUser,
    // user.sendEmailVerification()
 }

  async sendEmailVerification() {
    console.log('SEND EMAIL');
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  sendPasswordResetEmail(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    return this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate['inicio'];
    });
  }


  async isUserLoggedIn() {
    console.log('isUserLoggedIn()');
    return localStorage.getItem('user');
  }

  isAuth() {
    console.log('isAuth');
    console.log(localStorage.getItem('perfil'));
    //localStorage.setItem('rol',data['rol']);
    
    return this.angularFireAuth.authState.pipe(map(auth=>auth));
  }

  async  loginWithGoogle() {
    return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  cerrarSesion() {
    
    return this.angularFireAuth.auth.signOut().then(() => {
      //window.location.reload();
      this.router.navigate(['inicio']);
      console.log('cerrarSesion()');
      localStorage.removeItem('user');
    });
  }

  estaLogeado() {
    return this.angularFireAuth.auth.currentUser != null;
    // var pagina;
    // return pagina == this.router.getCurrentNavigation(); 
    //null usuario no logueado
    //no es null usuario logueado
    //las ordenes no se envian... debe funcionar 
  }
  inicio() {
    return this.angularFireAuth.auth.currentUser.email == null;
  }

  emailLogeado() {
    // console.log(this.angularFireAuth.auth.currentUser.email);
    return this.angularFireAuth.auth.currentUser.email == 'carlos.rotigrille@gmail.com';
  }

  perfilLogeado() {
    console.log('DisplayName: ',this.angularFireAuth.auth.currentUser.displayName)
    return this.angularFireAuth.auth.currentUser.displayName != 'O84lNoQAdvst0LNzOZM8';
  }



}
