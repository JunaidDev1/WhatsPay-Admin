import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests.component';
import { CollectionDataService } from './collection-data.service';


import * as firebase from 'firebase';
import { NgxLoadingModule } from 'ngx-loading';
import { SearchPipe } from './search.pipe';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'all-transactions', component: AllTransactionsComponent },
  { path: 'withdrawal-requests', component: WithdrawalRequestsComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

var firebaseConfig = {
  apiKey: "AIzaSyAICNaTIUFC_f4sMgZjB-XE28z252E6tLA",
  authDomain: "whatspay-cb555.firebaseapp.com",
  databaseURL: "https://whatspay-cb555.firebaseio.com",
  projectId: "whatspay-cb555",
  storageBucket: "whatspay-cb555.appspot.com",
  messagingSenderId: "782233150545",
  appId: "1:782233150545:web:cfa40aac8ed825401f8470",
  measurementId: "G-GR3M7N7J3E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    UserDetailComponent,
    AllTransactionsComponent,
    SettingsComponent,
    ProfileComponent,
    WithdrawalRequestsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    CollectionDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
