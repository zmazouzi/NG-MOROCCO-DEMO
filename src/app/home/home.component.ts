import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {DataService} from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngUsers: any[];
  constructor(public dataService: DataService){
    this.dataService.ngUsers.subscribe(res=> {
      this.ngUsers = res, error => console.log(error)
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




}
