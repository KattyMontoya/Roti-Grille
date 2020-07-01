import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from './auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor( private authService: AuthenticationService, private router: Router, private afa: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afa.authState.pipe(map(authState => !!authState))
    .pipe(switchMap((autenticado: boolean) => {
      if (!autenticado){
        this.router.navigate(['/login']);
        return of(false);
      }else{
        return of(true);
      }
    }));
  }
}
