import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs: AngularFirestore) { }

  // datosFac(documentId: string) {
  //   return this.afs.collection<Cliente>('clientes').doc(documentId).snapshotChanges();
  // }

  datosFac(idCliente: any){  
    return this.afs.collection('clientes', ref=> ref.where('id', '==', idCliente)).snapshotChanges();
  }

}
