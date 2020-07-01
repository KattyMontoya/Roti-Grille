import { Injectable } from '@angular/core';
import { Sugerencias } from '../_model/sugerencias';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SugerenciasService {

  private sugCollection: AngularFirestoreCollection<Sugerencias>;
  private sugerencias: Observable<Sugerencias[]>;

  constructor(private db: AngularFirestore,) { 
    this.sugCollection = db.collection<Sugerencias>(
      'quejas_sugerencias', ref => ref.where('estado', '==', true));
      // 'pedidos', ref => ref.where('tipo', '==', 'pendiente'));

    this.sugerencias = this.sugCollection.snapshotChanges().pipe(
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
    return this.db.collection<Sugerencias>('quejas_sugerencias').valueChanges();
  }

  listarQuejas() {
    return this.db.collection<Sugerencias>('quejas_sugerencias', ref => ref.where('tipo', '==', 'queja')).snapshotChanges();
  }

  listarSugerencias() {
    return this.db.collection<Sugerencias>('quejas_sugerencias', ref => ref.where('tipo', '==', 'sugerencia')).snapshotChanges();
  }

  eliminar(sugerencia: Sugerencias){
    return this.db.collection('quejas_sugerencias').doc(sugerencia.id).delete(); 
  }

  modificar(sugerencia: Sugerencias) {
    return this.db.collection('quejas_sugerencias').doc(sugerencia.id).set(Object.assign({}, sugerencia));
  }
}
