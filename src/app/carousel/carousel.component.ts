import { Component, OnInit } from '@angular/core';
import { InicioMovilService } from '../_service/inicio-movil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images_subs: Subscription;
  dataImages: any;

  constructor(
    private inicioService: InicioMovilService,
  ) { }

  ngOnInit() {
    this.getDataInicio();
  }

  ngOnDestroy() {
    this.images_subs.unsubscribe();
    console.log('Destroy subscription Inicio');
  }

  getDataInicio() {
    console.log('Ingresa');
    this.images_subs = this.inicioService.getInicio().subscribe(data => {
      console.log('Inicio images', data);
      this.dataImages = data;
    });
  }

}
