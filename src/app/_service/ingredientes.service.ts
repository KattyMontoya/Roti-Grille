import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ingredientes } from '../_model/ingredientes';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  constructor(private afs: AngularFirestore) { }

  crearIngrediente(receta: Ingredientes) {
    return this.afs.collection('receta').doc(receta.id).set({
      id: receta.id,
      iPlato: receta.idPlato,
      ingrediente: receta.ingrediente
    });
  }

  modificaIngrediente(receta: Ingredientes) {
    return this.afs.collection('receta').doc(receta.id).set((Object.assign({}, receta)));
  }

  eliminaIngrediente(receta: Ingredientes) {
    return this.afs.collection('receta').doc(receta.id).delete();
  }

  eliminaIngredienteDesdeMenu(receta: any[]) {
    console.log('array ingredientes a eliminar', receta);
    receta.forEach((dato:any)=>{
      // let idIngrediente;
      // idIngrediente = dato.id;
      // console.log(idIngrediente);
      return this.afs.collection('receta').doc(dato).delete();
    })
    //return this.afs.collection('receta').doc(receta.id).delete();
  }

  listarIngredientes(idPlato: any) {
    console.log('idPlato pasado', idPlato);
    return this.afs.collection('receta', ref=> ref.where('iPlato', '==', idPlato)).snapshotChanges();
    //return this.afs.collection<Ingredientes>('receta').valueChanges();
  }

  leerIngrediente(documentId: string){
    return this.afs.collection<Ingredientes>('receta').doc(documentId).valueChanges();
  }

}
