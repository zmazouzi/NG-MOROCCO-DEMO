import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthService, User} from "./auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  userID ;
  logged : boolean;
  constructor(private router: Router,
              private authService: AuthService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore
  ) {
    this.afAuth.authState
      .subscribe(
        user => {

          if(user ) {
            console.log(user.providerData);
            this.userID = user.uid
            this.logged = true

          }
          else {
            this.logged = false;
            if(this.userID) {
              const userRef = this.afs.doc<User>(`users/${this.userID}`)
              userRef.update({ state: 'OFFLINE'})
            }

          }
        }, error2 => {

        }
      )

  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }



}
