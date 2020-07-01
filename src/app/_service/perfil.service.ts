import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PerfilesI } from '../_model/perfiles.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfilesCollection: AngularFirestoreCollection<PerfilesI>;
  private perfiles: Observable<PerfilesI[]>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.perfilesCollection = db.collection<PerfilesI>(
      'perfiles', ref => ref.where('estado', '==', true));

    this.perfiles = this.perfilesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    
  }

  getPerfiles() {
    return this.perfiles;
  }

  getPerfile(id: string) {
    return this.perfilesCollection.doc<PerfilesI>(id).valueChanges();
  }

  updatePerfil(data: PerfilesI, id: string) {
    return this.perfilesCollection.doc(id).update(data);
  }

  postPerfil(data: PerfilesI) {
    const id = this.db.createId();
    return this.perfilesCollection.doc(id).set({ id, ...data });
  }

  addPerfil(data: PerfilesI) {
    return this.perfilesCollection.add(data);
  }

  removePerfil(id: string) {
    return this.perfilesCollection.doc(id).delete();
  }




}
