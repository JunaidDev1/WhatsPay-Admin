import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public uid: any;
  public user: any;
  public profileImage: any;
  public newFile = false;
  public loading = false;

  constructor() {
  }

  ngOnInit() {
    this.getAdminData();
  }

  getAdminData() {
    var self = this;
    self.loading = true;
    self.uid = localStorage.getItem('uid');
    firebase.database().ref().child('admins' + "/" + self.uid)
      .once('value', (snapshot) => {
        self.user = snapshot.val();
        self.loading = false;
      });
  }


  updateProfile() {
    if (this.newFile) {
      this.uploadProfileImg();
    }
    else {
      this.updateData();
    }
  }


  uploadProfileImg() {
    var self = this;
    self.loading = true;
    let storageRef = firebase.storage().ref();
    var metadata = {
      contentType: 'image/jpeg/png'
    };
    const filename = Math.floor(Date.now() / 1000);
    storageRef.child('profileImages/' + filename).put(self.profileImage, metadata)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            self.user.profileUrl = downloadURL;
            self.updateData();
          });
        });
  }

  updateData() {
    var updates = {};
    var self = this;
    updates['/admins' + '/' + self.uid] = self.user;
    firebase.database().ref().update(updates).then(() => {
      self.loading = false;
      localStorage.setItem('profileUrl', self.user.profileUrl);
      localStorage.setItem('firstName', self.user.firstName);
      localStorage.setItem('lastName', self.user.lastName);
    });
  }


  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.profileImage = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.user.profileUrl = reader.result;
      this.newFile = true;
    }
  }


}
