import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = "We need your name!";
  email: string;
  bio = "Nothing in here. Let's add some cool stuff!";
  imagePreview = "../../assets/friends.jpg";

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let name = this.authService.username;
    let bio = this.authService.bio;
    let imagePath = this.authService.imagePath;
    if (name !== 'undefined' && name !== '' && name !== null) {
      this.username = name;
    }
    if (bio !== 'undefined' && bio !== '' && bio !== null) {
      console.log(bio)
      this.bio = bio;
    }
    if (imagePath && imagePath !== 'undefined' && imagePath !== '' && imagePath !== null && !imagePath.includes('null')) {
      this.imagePreview = imagePath;
    }
    this.email = this.authService.email;
  }

}
