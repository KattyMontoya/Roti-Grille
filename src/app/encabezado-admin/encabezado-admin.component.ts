import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../_service/user.service';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-encabezado-admin',
  templateUrl: './encabezado-admin.component.html',
  styleUrls: ['./encabezado-admin.component.css']
})
export class EncabezadoAdminComponent implements OnInit {

  perfiles_subs: Subscription;
  dataPerfiles : any;

  constructor(public loginService: AuthenticationService, private perfilUserService: UserService,) { }

  ngOnInit() {
  }

}
