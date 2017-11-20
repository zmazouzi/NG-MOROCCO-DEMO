import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<any>;

  constructor(private router: Router,
              private authService: AuthService,
              private afAuth: AngularFireAuth) {

  }

  ngOnInit() {}

  public login():void {
    console.log(">> Login");
  }

  public loginWithGoogle():void {
    this.authService.loginGoogle();
  }

  public loginWithGithub():void {
    this.authService.loginGithub();
  }
}
