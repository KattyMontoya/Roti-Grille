import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../_model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private user: Observable<Usuario[]>;

  constructor(private afs: AngularFirestore) { 
    this.userCollection = afs.collection<User>(
      'usuarios', ref => ref.where('estado', '==', true));
      // 'usuarios', ref => ref.where('perfil', '==', 'O84lNoQAdvst0LNzOZM8'));

    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  getUserPerfil() {
    return this.afs.collection<User>('usuarios').valueChanges();
  }

  listar() {
    //return this.afs.collection<User>('usuarios').valueChanges();
    return this.afs.collection<User>('usuarios').snapshotChanges();
    // return this.afs.collection('usuarios', ref=> ref.where('perfil', '==', 'O84lNoQAdvst0LNzOZM8')).snapshotChanges();

  }

  creacionUser(user: User) {
    return this.afs.collection('usuarios').doc(user.id).set({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      cedula: user.cedula,
      email: user.email,
      celular: user.celular,
      direccion: user.direccion,
      estado: user.estado,
      perfil: user.perfil
    });
  }

  validaCedula(cedula: any){  
    return this.afs.collection('usuarios', ref=> ref.where('cedula', '==', cedula)).snapshotChanges();
  }

  validaCorreo(correo: any){
    // let repetida: boolean = false;   
    return this.afs.collection('usuarios', ref=> ref.where('email', '==', correo)).snapshotChanges();
    // if(this.correoRepetido == '' || this.correoRepetido ==  null || this.correoRepetido == undefined){
    //   repetida = false;
    // } else {
    //   repetida = true;
    // }
    // console.log('correo pasada', correo);
    // console.log('correo consultada', this.correoRepetido);
    // console.log('correo repetida?', repetida)
    // return repetida;
  }

  postUser(data: User) {
    const id = this.afs.createId();
    return this.userCollection.doc(id).set({ id, ...data });
  }

  modificar(user: User) {
    return this.afs.collection('usuarios').doc(user.id).set(Object.assign({}, user));
  }

  leerUser(documentId: string) {
    return this.afs.collection<User>('usuarios').doc(documentId).valueChanges();
  }

  eliminar(user: User) {
    return this.afs.collection('usuarios').doc(user.id).delete();
  }


}


