import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loading = false;
  public usersCount: any;
  public allUsers: Array<any> = [];

  constructor(
    public router: Router
  ) {
  }

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('users')
      .once('value', function (snapshot) {
        var users = snapshot.val();
        for (var key in users) {
          var user = users[key];
          user.key = key;
          self.allUsers.push(user);
        }
        self.loading = false;
        self.usersCount = self.allUsers.length;
      });
  }

  updateStatus(user, status) {
    user.status = status;
    var updates = {};
    updates['/users' + '/' + user.uid + "/" + "status"] = status;
    firebase.database().ref().update(updates).then(() => {
    });
  }


}
