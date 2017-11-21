import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private afAuth: AngularFireAuth) {

  }

  ngOnInit() {}

  public login():void {
    console.log(">> Login");
  }

  public loginWithGoogle():void {
    this.authenticationService.loginWithGoogle();
  }

  public loginWithGithub():void {
    this.authenticationService.loginWithGithub();
  }
}
