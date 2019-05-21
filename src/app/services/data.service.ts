import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastrService} from "toastr-ng2";
@Injectable()
export class DataService {
  ngUsersRef: AngularFirestoreCollection<any>;
  ngUsers: Observable<any[]>;

  userID: any;

  constructor(private authenticationService: AuthenticationService,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private toastrService: ToastrService) {

    this.ngUsersRef = afs.collection('users', ref => ref.orderBy("state", 'desc'));
    this.ngUsers = this.ngUsersRef.valueChanges();
  }

}
