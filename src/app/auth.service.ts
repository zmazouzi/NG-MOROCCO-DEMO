import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Router} from "@angular/router";


export interface User {
  uid?: string,
  email?: string,
  photoURL?: string,
  displayName?: string,
  lastLog?: number,
  state?: string
}

@Injectable()
export class AuthService {
    userRef: any;
    ngUser: Observable<User>;
    userData: any;
  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public router: Router
  ) {
      this.afAuth.authState
        .switchMap(user => {
          if(user) {
            this.userData = user
            this.userRef = this.afs.doc<User>(`users/${user.uid}`)
            this.userRef.update({ state: 'ONLINE'})
            this.ngUser = this.userRef.valueChanges();
            return this.ngUser

          }
          else {
            console.log(this.userData)
            return Observable.of(null)

          }
        })

  }



  loginGoogle() {
    const provider  = new firebase.auth.GoogleAuthProvider()

    return  this.oAuthLogin(provider)

  }
  loginGithub() {
    const provider  = new firebase.auth.GithubAuthProvider()

    return  this.oAuthLogin(provider)

  }



  oAuthLogin(provider) {
    console.log("login start ")
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credentials => {
        console.log("login load ")
        this.updateUserData(credentials.user)
      })
      ;
  }


  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid : user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      lastLog: Date.now(),
      state: "ONLINE"
    }
    return userRef.set(data)

  }

  logout() {
    this.afAuth.auth.signOut();
    this.afAuth.authState
      .switchMap(user => {
        if(user) {
          this.userRef = this.afs.doc<User>(`users/${user.uid}`)
          this.userRef.update({ state: 'OFFLINE'})
          this.ngUser = this.userRef.valueChanges();
          return this.ngUser

        }
        else {

          return Observable.of(null)
        }
      })


  }


  // Get user ID only once to update their state to 'OFFLINE' when they close the browser

  getUserID() {
    return this.afAuth.authState

      .take(1)
      .map( res => { return res.uid})


  }


}
