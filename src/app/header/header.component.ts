import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public adminName: any;
  public profileUrl: any;

  constructor(
    public router: Router
  ) {
    var status = localStorage.getItem('userLoggedIn');
    if (status == 'false' || status == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.profileUrl = localStorage.getItem('profileUrl');
    this.adminName = localStorage.getItem('firstName') + " " + localStorage.getItem('lastName');
  }

  logout() {
    var self = this;
    var user = firebase.auth().currentUser;
    if (user) {
      firebase.auth().signOut().then(() => {
        localStorage.setItem('userLoggedIn', 'false');
        localStorage.clear();
        self.router.navigate(['/login']);
      })
        .catch((error) => {
          alert(error);
        })
    }
    else {
      localStorage.setItem('userLoggedIn', 'false');
      localStorage.clear();
      self.router.navigate(['/login']);
    }
  }

}
