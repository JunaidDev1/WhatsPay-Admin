import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public currentPassword: any;
  public newPassword: any;
  public cNewPassword: any;
  public email: any;
  public loading = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  updatePassword() {
    var self = this;
    if (self.currentPassword == "") {
      alert("Please enter current password!");
      return;
    }
    if (!self.newPassword || self.newPassword == "" || self.newPassword.length < 6) {
      alert("New password length is invalid!");
      return;
    }
    if (self.newPassword != self.cNewPassword) {
      alert("New passwords mismatch!");
      return;
    }
    else {
      self.updateFirebasePassword();
    }
  }

  updateFirebasePassword() {
    var self = this;
    self.loading = true;
    firebase.auth().signInWithEmailAndPassword(self.email, self.currentPassword).then((user) => {
      if (user) {
        firebase.auth().currentUser.updatePassword(self.newPassword).then(() => {
          self.loading = false;
          alert("Password updated successfully!");
          localStorage.clear();
          localStorage.setItem('userLoggedIn', 'false');
          self.router.navigate(['/login']);
        })
      }
    })
      .catch((error) => {
        var errorMessage = error.message;
        self.loading = false;
        alert(errorMessage);
      });
  }

}
