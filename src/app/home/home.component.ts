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
import {UserPresenceService} from "../user-presence.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngUsers: any[];
  timer: Subscription;
  userRef;
  userId: string;

  private mouseEvent = new Rx.Subject<any>();

  constructor(public dataService: DataService,
              private toastr: ToastrService,
              private afs: AngularFirestore,
              private authService: AuthService,
              private userPresence: UserPresenceService
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

        this.ngUsers = users
        // console.log(this.ngUsers)


        , error => console.log(error)
    })



    this.userPresence.getUsers(this.dataService.ngUsers)
   }

  ngOnInit() {
    this.mouseEvent
      .throttleTime(2000)
      .subscribe( res => {
        // update User state
          if (this.userRef) {
            this.userRef.update({ state: 'ONLINE'})
            this.resetTimer()
          }

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






  // update UserState to Online and resetTimer
  updateState(event) {

    this.mouseEvent.next(event)
  }

// if timer expire set state to away

  resetTimer() {
    if (this.timer) this.timer.unsubscribe();

    this.timer = Observable.timer(5000)
      .do( () => {
        this.userRef.update({state : 'AWAY'})

      })
      .subscribe()
  }







}
