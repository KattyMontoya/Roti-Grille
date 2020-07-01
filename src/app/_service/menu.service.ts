import { Injectable } from '@angular/core';
import { FirebaseFirestore } from '@angular/fire';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();
  constructor(private afs: AngularFirestore) { }

  listar() {
    return this.afs.collection<Menu>('menus').valueChanges();
  }
}
