import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_service/auth-firebase.service';

@Component({
  selector: 'app-home-empleados',
  templateUrl: './home-empleados.component.html',
  styleUrls: ['./home-empleados.component.css']
})
export class HomeEmpleadosComponent implements OnInit {

  constructor(public loginService: AuthenticationService) { }

  ngOnInit() {
  }

}
