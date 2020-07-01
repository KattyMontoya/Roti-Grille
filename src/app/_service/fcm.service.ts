import { Injectable } from '@angular/core';

import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { messaging } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
// import { DatosUsuario } from '../modelos/usuario';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  // messaging: any;
  // currentMessage = new BehaviorSubject(null);

  private messaging = firebase.messaging();
  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  constructor(
    // private angularFireMessaging: AngularFireMessaging,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {

    // this.angularFireMessaging.messaging.subscribe((_messaging) => {
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // });
  }


  // ============================================================================================================
  // GET PERMISSION NOTIFICATION
  // ============================================================================================================


  // get permission to send messages
  async getPermission(id: string) {
    console.log('fcm.service → getPermission');

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    this.messaging.requestPermission().then(() => {
      console.log('Notification permission granted.');
      return this.messaging.getToken()
    }).then(token => {
      // console.log('Token:', token);
      // this.updateUser_token(id, token);
      var notification = new Notification("Bienvenido a la Plataforma Roti-Grill");
      // this.saveToken(user, token)
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });

  }


  // Listen for token refresh
  refreshToken(id: string) {
    console.log('fcm.service → refreshToken');
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken().then(refreshedToken => {
        console.log('Token refreshed.');
        this.updateUser_token(id, refreshedToken);
        // this.saveToken(user, refreshedToken)
      }).catch(err => console.log(err, 'Unable to retrieve new token'))
    });
  }


  // used to show message when app is open
  receiveMessages() {
    console.log('fcm.service → receiveMessages');
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.messageSource.next(payload)
    });
    console.log('fcm.service → receiveMessages');

  }


  // Actulidar token de usuario logueado
  updateUser_token(id: string, token: any) {
    console.log('fcm.service → updateUser_token');
    let user = this.firestore.collection<any>('Users');
    return user.doc(id).update({
      token: token
    });
  }


  // ============================================================================================================
  // SEND - NOTIFICATION
  // ============================================================================================================

  sendPostRequest_Notification(title: string, msg: string, token: string) {
    console.log('fcm.service -> sendPostRequest_Notification');

    console.log('fcm.service -> TITLE:', title);
    console.log('fcm.service -> MSG:', msg);
    console.log('fcm.service -> TOKEN:', token);

    console.log('send Notification: OK');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAqIWhJUw:APA91bGPGKrZAkKKU6LNhv_YMFOJfH5ay_yFq2p_pBOw6YXQ4yxggRHLs8czGz-LM6hUmRYxcvFqcE3oAnPUp7eDFgpFull-YYaUIx2xSrJyiIXUUF4xPeOtj0t-zbUwE538ChkrGWnY'
      })
    };
    const postData = {
      notification: {
        title: title,
        body: msg,
        sound: "default"
      },
      to: token,
      priority: "high",
      importance: "high",
    };

    this.http.post('https://fcm.googleapis.com/fcm/send', postData, httpOptions).subscribe(
      data => {
        console.log('Envio notificacion: OK');
        // console.log(data['body']);
        // console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  sendNotificacion(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAqIWhJUw:APA91bGPGKrZAkKKU6LNhv_YMFOJfH5ay_yFq2p_pBOw6YXQ4yxggRHLs8czGz-LM6hUmRYxcvFqcE3oAnPUp7eDFgpFull-YYaUIx2xSrJyiIXUUF4xPeOtj0t-zbUwE538ChkrGWnY'
      })
    };
    const postData = {
      notification: {
        title: 'Roti-Grill',
        body: 'Cambio de estado'
      },
      to: token
    };

    this.http.post('https://fcm.googleapis.com/fcm/send', postData, httpOptions).subscribe(
      data => {
        console.log('Envio notif');
        console.log(data['body']);
      },
      error => {
        console.log(error);
      }
    );
  }





}
