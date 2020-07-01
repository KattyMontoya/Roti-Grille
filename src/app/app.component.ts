import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { AuthenticationService } from './_service/auth-firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  menus: Menu[] =[];

  constructor(
    public loginServices: AuthenticationService,
    private menuServices: MenuService
  ){}

  ngOnInit(){
    // this.menuServices.menuCambio.subscribe(data => {
    //   this.menus = data;
    // })
  }

}
