import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Dispositivo } from '../_model/dispositivos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {
  private dispositivosCollection: AngularFirestoreCollection<Dispositivo>;
  private dispositivos: Observable<Dispositivo[]>;

  constructor(private afs: AngularFirestore) { 
    this.dispositivosCollection = afs.collection<Dispositivo>(
      'mesas', ref => ref.where('estado', '==', true));

    this.dispositivos = this.dispositivosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  getDispositivo(id: string) {
    return this.dispositivosCollection.doc<Dispositivo>(id).valueChanges();
  }

  listar() {
    //return this.afs.collection<User>('usuarios').valueChanges();
    return this.afs.collection<Dispositivo>('mesas').snapshotChanges();

  }

  idMesa(idMesa: any) {
    console.log('idMesa pasado', idMesa);
    return this.afs.collection('mesas', ref=> ref.where('mesa_uid', '==', idMesa));
    //return this.afs.collection<Ingredientes>('receta').valueChanges();
    // if(this.afs.collection('mesas', ref=> ref.where('mesa_uid', '==', idMesa))){}
  }

  modificar(mesa: Dispositivo) {
    return this.afs.collection('mesas').doc(mesa.id).set((Object.assign({}, mesa)));
  }

  eliminaIngrediente(mesa: Dispositivo) {
    return this.afs.collection('mesas').doc(mesa.id).delete();
  }

}
