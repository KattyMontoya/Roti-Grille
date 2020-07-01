import { Injectable } from '@angular/core';
import { Categoria } from '../_model/categoria.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriaCollection: AngularFirestoreCollection<Categoria>;
  private categorias: Observable<Categoria[]>;

  constructor(private db: AngularFirestore) {
    this.categoriaCollection = db.collection<Categoria>(
      'categorias', ref => ref.where('estado', '==', true));

    this.categorias = this.categoriaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCategorias() {

    return this.categorias;


    console.log("-----" + this.categorias);


  }

  getCategoria(id: string) {
    return this.categoriaCollection.doc<Categoria>(id).valueChanges();
  }

  getCategoriaNombre(id: string) {
    // return this.categoriaCollection.doc<Categoria>(id).valueChanges();
    // return this.afs.collection('usuarios', ref=> ref.where('cedula', '==', cedula)).snapshotChanges();
    return this.db.collection('categorias', ref => ref.where('id', '==', id)).snapshotChanges();
  }

  updateCategoria(data: Categoria, id: string) {
    return this.categoriaCollection.doc(id).update(data);
  }

  postCategoria(data: Categoria) {
    const id = this.db.createId();
    return this.categoriaCollection.doc(id).set({ id, ...data });
  }

  addCategoria(data: Categoria) {
    return this.categoriaCollection.add(data);
  }

  creacionCategoria(promocion: Categoria) {
    return this.db.collection('categorias').doc(promocion.id).set({
      id: promocion.id,
      nombre: promocion.nombre.toLowerCase(),
      estado: promocion.estado,
      imagen: promocion.imagen,

    });
  }

  categoriaDuplicada(nombreCategoria: any) {
    return this.db.collection('categorias', ref => ref.where('nombre', '==', nombreCategoria.toLowerCase())).snapshotChanges();
  }

  removeCategoria(id: string) {
    return this.categoriaCollection.doc(id).delete();
  }
}
