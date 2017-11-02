import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import 'rxjs/add/operator/debounceTime';
import * as moment from 'moment';
import * as Rx from 'rxjs/Rx';
import {ToastrService} from "toastr-ng2";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngUsers: any[];

  private waveEvent = new Rx.Subject<any>();
  constructor(public dataService: DataService,
              private toastr: ToastrService
  ){
    this.dataService.ngUsers
      .subscribe(res=> {

        var users: any[] = res;
        for (let user of users) {
          user.lastLog = moment(user.lastLog).fromNow();;
        }

      this.ngUsers = users, error => console.log(error)
    })

    // listen to wave events
    this.waveEvent
      .debounceTime(2000)
      .subscribe( res => {
        // wave other ng-morcco community members
        this.toastr.info((res))

    })

  }

  ngOnInit() {
  }

  getStyle(state: string) {
    var style: string;
    if(state == "ONLINE") {
      style = "badge-success"
    }
    else {
      style = "badge-default"

    }
    return style
  }


  ngWave(uid: string) {
    // wave other ng-morcco community members
      this.waveEvent.next(uid)
  }




}
