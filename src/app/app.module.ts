import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './home/home.component';
import {AuthService} from "./services/auth.service";
import { FullTextSearchPipe } from './full-text-search.pipe';
import {FormsModule} from "@angular/forms";
import {DataService} from "./services/data.service";

import {ToastrModule, ToastrService} from "toastr-ng2";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserPresenceService} from "./user-presence.service";
import {ChartsModule} from "ng2-charts";
import { ChartsComponent } from './charts/charts.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FullTextSearchPipe,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    FormsModule,
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService,DataService,ToastrService,UserPresenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
