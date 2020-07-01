import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Pedidos } from '../_model/pedidos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PedidosEntService {

  private pedidoCollection: AngularFirestoreCollection<Pedidos>;
  private pedidos: Observable<Pedidos[]>;

  constructor(private db: AngularFirestore, ) {
    this.pedidoCollection = db.collection<Pedidos>(
      'pedidos', ref => ref.where('estado', '==', true));
    // 'pedidos', ref => ref.where('tipo', '==', 'pendiente'));

    this.pedidos = this.pedidoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPedidos() {
    return this.pedidos;
    console.log("-----" + this.pedidos);


  }

  listar() {
    return this.db.collection<Pedidos>('pedidos').valueChanges();
  }

  listarPorFecha(fechaDesde: any, fechaHasta: any) {
    let inicio = new Date(fechaDesde).getTime();
    let fin = new Date(fechaHasta).getTime();

    console.log('fecha desde', inicio);
    console.log('fecha hasta', fin);

    if(inicio == fin){
      fin = fin + 86400000;
      console.log('fecha fin, con fechas iguales', fin);
    }else{
      fin = fin + 86399999;
      console.log('fecha fin normal', fin);
    }

    return this.db.collection('pedidos', ref => ref.where('fecha', '>=', inicio)
      .where('fecha', '<', fin)).snapshotChanges();

  }


  getPedido(id: string) {
    return this.pedidoCollection.doc<Pedidos>(id).valueChanges();
  }

  updatePedido(data: Pedidos, id: string) {
    return this.pedidoCollection.doc(id).update(data);
  }

  // creacionPedido(promocion: Categoria) {
  //   return this.db.collection('categorias').doc(promocion.id).set({
  //     id: promocion.id,
  //     nombre: promocion.nombre,
  //     estado: promocion.estado,
  //     imagen: promocion.imagen,

  //   });
  // }

  modificar(pedidos: Pedidos) {
    return this.db.collection('pedidos').doc(pedidos.id).set(Object.assign({}, pedidos));
  }

  // leerPlato(documentId: string) {
  //   return this.afs.collection<Plato>('productos').doc(documentId).valueChanges();
  // }

  eliminar(pedidos: Pedidos) {
    return this.db.collection('pedidos').doc(pedidos.id).delete();
  }

}
