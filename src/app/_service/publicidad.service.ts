import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publicidad } from '../_model/publicidad';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {
  private publicidadCollection: AngularFirestoreCollection<Publicidad>;
  private publicidad: Observable<Publicidad[]>;

  constructor(private db: AngularFirestore,
    ) { 
      this.publicidadCollection = db.collection<Publicidad>(
        'publicidad', ref => ref.where('estado', '==', true));
  
      this.publicidad = this.publicidadCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    getPublicidades() {
      return this.publicidad;
    }
  
    getPublicidad(id: string) {
      return this.publicidadCollection.doc<Publicidad>(id).valueChanges();
    }
  
    modificar(publi: Publicidad){
      return this.db.collection('publicidad').doc(publi.id).set(Object.assign({}, publi));
    }
    
  
  
    creacionPubli(publi: Publicidad) {
      return this.db.collection('publicidad').doc(publi.id).set({
        id: publi.id,
        nombre: publi.nombre,
        detalle: publi.detalle,
        estado: publi.estado,
        imagen: publi.imagen,
        // precio: publi.precio,
        // observacion: publi.observacion,
  
      });
    }
  
  
    eliminar(publi:Publicidad){
      return this.db.collection('publicidad').doc(publi.id).delete(); 
    }
  
  }
