import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public onLoginForm: FormGroup;
  public email: any;
  public password: any;
  public uid: any;
  public loading: any = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public _fb: FormBuilder) {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  userLogin() {
    var self = this;
    self.loading = true;
    firebase.auth().signInWithEmailAndPassword(self.email, self.password).then((user) => {
      if (user) {
        this.uid = user.user.uid;
        self.getUserData();
      }
    })
      .catch((error) => {
        self.loading = false
        var errorMessage = error.message;
        alert(errorMessage);
      })
  }

  getUserData() {
    var self = this;
    firebase.database().ref().child('admins' + '/' + this.uid).once('value', (snapshot) => {
      var user = snapshot.val();
      if (user) {
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
        localStorage.setItem('email', user.contactEmail);
        localStorage.setItem('profileUrl', user.profileUrl);
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('uid', user.uid);
        self.router.navigate(['/home']);
      }
      else {
        alert("No user found!");
      }
      this.loading = false;
    })
  }

}

