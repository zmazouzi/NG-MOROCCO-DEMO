import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {Router} from "@angular/router";
import {ToastrService} from "toastr-ng2";
import {User} from "../models/user.model";

@Injectable()
export class AuthenticationService {
  userRef: any;
  ngUser: Observable<User>;
  userData: any;

  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public router: Router,
              public toastrService: ToastrService) {

    this.afAuth.authState.switchMap(user => {
      if (user) {
        this.userData = user;
        this.userRef = this.afs.doc<User>(`users/${user.uid}`);
        this.userRef.update({state: 'ONLINE'});
        this.ngUser = this.userRef.valueChanges();
        this.toastrService.info("someone waved you");
        return this.ngUser;
      } else {
        console.log(this.userData);
        return Observable.of(null);
      }
    })
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  loginWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    console.log("login start ");
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credentials => {
        console.log("login load ");
        this.updateUserData(credentials.user);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      lastLog: Date.now(),
      state: "ONLINE"
    };
    return userRef.set(data);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.userRef = this.afs.doc<User>(`users/${user.uid}`);
          this.userRef.update({state: 'OFFLINE'});
          this.ngUser = this.userRef.valueChanges();
          return this.ngUser;
        } else {
          return Observable.of(null);
        }
      })
  }

  // Get user ID only once to update their state to 'OFFLINE' when they close the browser
  getUserID() {
    return this.afAuth.authState
      .take(1)
      .map(res => {
        return res.uid
      })
  }
}
