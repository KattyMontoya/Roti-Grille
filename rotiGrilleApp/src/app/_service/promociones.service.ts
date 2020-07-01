import { Injectable } from '@angular/core';
import { Categoria } from '../_model/categoria.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Promociones } from '../_model/promociones';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {
  private promocionesCollection: AngularFirestoreCollection<Promociones>;
  private promociones: Observable<Promociones[]>;

  constructor(private db: AngularFirestore,
    ) { 
      this.promocionesCollection = db.collection<Promociones>(
        'promociones', ref => ref.where('estado', '==', true));
  
      this.promociones = this.promocionesCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

    getPromociones() {
      return this.promociones;
    }
  
    getPromocion(id: string) {
      return this.promocionesCollection.doc<Promociones>(id).valueChanges();
    }
  
    modificar(plato: Promociones){
      return this.db.collection('promociones').doc(plato.id).set(Object.assign({}, plato));
    }
    
  
  
    creacionPlato(promocion: Promociones) {
      return this.db.collection('promociones').doc(promocion.id).set({
        id: promocion.id,
        nombre: promocion.nombre,
        detalle: promocion.detalle,
        estado: promocion.estado,
        imagen: promocion.imagen,
        precio: promocion.precio,
        observacion: promocion.observacion,
  
      });
    }
  
  
    eliminar(promocion:Promociones){
      return this.db.collection('promociones').doc(promocion.id).delete(); 
    }
  
  }
