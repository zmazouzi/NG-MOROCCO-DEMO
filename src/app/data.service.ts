import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DataService {
  ngUsersRef: AngularFirestoreCollection<any>;
  ngUsers: Observable<any[]>;

  constructor(private authService: AuthService,
              private afs: AngularFirestore
  ) {
    this.ngUsersRef = afs.collection('users')
    this.ngUsers = this.ngUsersRef.valueChanges();
  }
}
