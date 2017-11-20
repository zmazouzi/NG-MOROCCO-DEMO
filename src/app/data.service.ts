import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import * as _ from 'lodash'
import {ToastrService} from "toastr-ng2";
@Injectable()
export class DataService {
  ngUsersRef: AngularFirestoreCollection<any>;
  ngUsers: Observable<any[]>;

  userID: any;



  constructor(private authService: AuthService,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private toastrService: ToastrService
  ) {

    // Get the list of ngUSERS

    this.ngUsersRef = afs.collection('users', ref => ref.orderBy("state",'desc'))
    this.ngUsers = this.ngUsersRef.valueChanges();


  }




}
