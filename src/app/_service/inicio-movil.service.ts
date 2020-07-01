import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { InicioMovil } from '../_model/inicio';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class InicioMovilService {

  private inicioCollection: AngularFirestoreCollection<InicioMovil>;
  private inicio: Observable<InicioMovil[]>;

  constructor(private afs: AngularFirestore) {
    this.inicioCollection = afs.collection<InicioMovil>(
      'inicio', ref => ref.where('estado', '==', true));

    this.inicio = this.inicioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  listar() {
    return this.afs.collection<InicioMovil>('inicio').valueChanges();
  }

  getInicio() {
    return this.inicio;
    console.log("-----" + this.inicio);
  }

  crear(pagInicio: InicioMovil) {
    return this.afs.collection('inicio').doc(pagInicio.id).set({
      id: pagInicio.id,
      nombre: pagInicio.nombre.toLowerCase(),
      estado: pagInicio.estado,
      imagen: pagInicio.imagen,
      plataforma: pagInicio.plataforma,
    });
  }

  modificar(pagInicio: InicioMovil) {
    return this.afs.collection('inicio').doc(pagInicio.id).set(Object.assign({}, pagInicio));
  }


  eliminar(pagInicio: InicioMovil) {
    return this.afs.collection('inicio').doc(pagInicio.id).delete();
  }
}

