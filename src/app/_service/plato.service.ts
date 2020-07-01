import { Plato } from '../_model/plato';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private afs: AngularFirestore) {

  }

  listar() {
    return this.afs.collection<Plato>('productos').valueChanges();
  }

  creacionPlato(plato: Plato) {
    return this.afs.collection('productos').doc(plato.id).set({
      id: plato.id,
      nombre: plato.nombre.toLowerCase(),
      precio: plato.precio,
      //detalle: plato.detalle,
      categoria: plato.categoria,
      estado: plato.estado,
      imagen: plato.imagen,
      //observacion: plato.observacion,
      /// ingredientes: Object.assign({}, plato.ingredientes)
      ingredientes: plato.ingredientes
    });
  }

  vlidaNombre(nombrePlato: any){  
    return this.afs.collection('productos', ref=> ref.where('nombre', '==', nombrePlato)).snapshotChanges();
  }

  modificar(plato: Plato) {
    return this.afs.collection('productos').doc(plato.id).set(Object.assign({}, plato));
  }

  leerPlato(documentId: string) {
    return this.afs.collection<Plato>('productos').doc(documentId).valueChanges();
  }

  eliminar(plato: Plato) {
    return this.afs.collection('productos').doc(plato.id).delete();
  }

}


