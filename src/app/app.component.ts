import {Component, OnDestroy} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthService, User} from "./services/auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";

import {ToastrService} from "toastr-ng2";
import {DataService} from "./services/data.service";

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy{

  userID ;
  logged : boolean;
  wavesDoc: any;
  waves: any;
  constructor(private router: Router,
              private authService: AuthService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private dataService: DataService

  ) {

    this.afAuth.authState
      .subscribe(
        user => {

          if(user ) {
            // If user is logged in set UserID and navigate to home
            this.userID = user.uid
            this.logged = true
            this.router.navigate(["/home"])


          }
          else {
            // set state to offline and navigate to logout

            this.logged = false;
            this.router.navigate(["/login"])

            if(this.userID) {
              const userRef = this.afs.doc<User>(`users/${this.userID}`)

              userRef.update({ state: 'OFFLINE'})
            }

          }
        }, error2 => {

        }
      )




  }

  ngOnDestroy( ) {

  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }



}
