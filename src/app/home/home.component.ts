import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import 'rxjs/add/operator/debounceTime';
import * as moment from 'moment';
import * as Rx from 'rxjs/Rx';
import {ToastrService} from "toastr-ng2";
import {AngularFirestore} from "angularfire2/firestore";
import {AuthService, User} from "../auth.service";
import  { Subscription } from 'rxjs/Subscription'
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngUsers: any[];
  timer: Subscription;
  userId: string;
  userRef;
  private mouseEvent = new Rx.Subject<any>();

  constructor(public dataService: DataService,
              private toastr: ToastrService,
              private afs: AngularFirestore,
              private authService: AuthService
  ){



    this.authService.getUserID().subscribe( userId => {
    this.userId = userId
      this.userRef = this.afs.doc<User>(`users/${this.userId}`)

      console.log(this.userId)
  });


    this.dataService.ngUsers
      .subscribe(res=> {

        // Format the last log using MOMENT JS

        var users: any[] = res;
        for (let user of users) {
          user.lastLog = moment(user.lastLog).fromNow();
        }

      this.ngUsers = users, error => console.log(error)
    })



  }

  ngOnInit() {
    this.mouseEvent
      .throttleTime(2000)
      .subscribe( res => {
        // update User state
        console.log(res)
         this.userRef.update({ state: 'ONLINE'})
         this.resetTimer()
      })

  }

  getStyle(state: string) {
    var style: string;
    if(state == "ONLINE") {
      style = "badge-success"
    }
    else if ( state == "AWAY"){
      style = "badge-warning"

    }
    else {
      style = "badge-default"
    }
    return style
  }


  ngWave(uid: string) {
    // wave other ng-morcco community members

  }


  updateState(event) {

    this.mouseEvent.next(event)
  }


  resetTimer() {
    if (this.timer) this.timer.unsubscribe();

    this.timer = Observable.timer(5000)
      .do( () => {
        this.userRef.update({state : 'AWAY'})

      })
      .subscribe()
  }







}
