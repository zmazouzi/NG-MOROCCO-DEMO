import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import  * as _ from 'lodash'
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserPresenceService {
    users;
    states: Subject<any> = new Subject<any>();


  constructor() {

  }

  getUsers(users) {

    users

      .subscribe(res => {
        this.users = res
        var onlineUsers = _.filter(this.users, function (user) {
          return user.state == "ONLINE"
        });
        var offlineUsers = _.filter(this.users, function (user) {
          return user.state == "OFFLINE"
        });
        var awayUsers = _.filter(this.users, function (user) {
          return user.state == "AWAY"
        });

        this.states.next([onlineUsers.length,offlineUsers.length,awayUsers.length])


      })
  }



}
