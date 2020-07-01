import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReporteServiceService {

  constructor(private afs:AngularFirestore) { }

  listar(fechaIni: Date, fechaFin: Date){
    let inicio = moment(fechaIni).toISOString();
    let fin = moment(fechaFin).toISOString();

    console.log(inicio);
    console.log(fin);

    return this.afs.collection('ordenes', ref => ref.where('fechaPedido', '>=', new Date(inicio))
    .where('fechaPedido', '<', new Date(fin))).snapshotChanges();
    //definir la coleccion donde se deben sacar los reportes de ventas, que se deberia generar al momento de aceptar una orden
    //al aceptar una orden se deberia generar un registro en la coleccion reporte ventas con la venta de la orden y la fecha de creacion
    //¨fechaPedido¨ es el atributo por el cual se esta buscando el reporte
  }

}
