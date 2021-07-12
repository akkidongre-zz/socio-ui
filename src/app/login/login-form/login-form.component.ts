import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/models/auth.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedIn = false;
  isLoggingIn = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private apiService: ApiService,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.authService.autoLogin();

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if (user) {
        this.isLoggedIn = true;
      }
      console.log(this.socialUser);
    }, 
    (error) => {
      console.log(error);
    });
  }

  loginWithEmail() {
    if (!this.loginForm.valid) {
      return;
    }

    this.isLoggingIn = true;

    const authData: AuthData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.apiService.loginUser(authData).subscribe((data) => {
      console.log(data);
      this.isLoggingIn = false;
      this.authService.email = authData.email;
      this.authService.imagePath = data.imagePath;
      this.authService.bio = data.bio;
      this.authService.logIn(data.token, data.expiresIn);
    }, (error) => {
      console.log(error);
      this.isLoggingIn = false;
      this.snackbar.open("Email or password is wrong. Please check", "Oh!", {
        duration: 3000
      });
    });
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      const authData = {
        email: data.email,
        password: data.email,
        name: data.name,
        imagePath: data.photoUrl,
        expiresIn: data.response.expires_in
      }

      console.log(authData);
      this.loginAsSocialUser(authData);
      
    }).catch((err) => {
      console.log(err);
    });
  }

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      const authData = {
        name: data.name,
        email: data.email,
        password: data.email,
        imagePath: data.photoUrl,
        expiresIn: 3600
      }

      this.loginAsSocialUser(authData);
    }).catch((err) => {
      console.log(err);
    });
  }

  loginAsSocialUser(authData: {name: string, email: string, password: string, imagePath: string, expiresIn: number}) {
    this.apiService.loginSocialUser(authData).subscribe((data) => {
      console.log(data);
      
      this.isLoggingIn = false;
      this.authService.username = authData.name;
      this.authService.email = authData.email;
      this.authService.imagePath = authData.imagePath;
      this.authService.bio = data.bio;
      if (data.message === "Logged in") {
        this.authService.imagePath = data.imagePath;
      }
      this.authService.logIn(data.token, data.expiresIn);
    }, (error) => {
      this.snackbar.open("Could not sign you in", "Oh!", {
        duration: 3000
      });
    });
  }

}
