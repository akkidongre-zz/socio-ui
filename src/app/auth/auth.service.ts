import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from '../posts/posts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  private token: string;
  username: string;
  email: string;
  bio: string;
  imagePath: string;

  authStatus = new BehaviorSubject<boolean>(false);

  tokenTimer: ReturnType<typeof setTimeout>;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { }

  getToken() {
    return this.token;
  }

  logIn(token: string, expiresIn: number) {
    this.isLoggedIn = true;
    this.token = token;
    this.setAuthTimer(expiresIn);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    this.saveAuthData(token, expirationDate);
    this.authStatus.next(true);
    this.router.navigate(['/profile']);
  }

  autoLogin() {
    const authInfo = this.getAuthData();
    const now = new Date();
    if (authInfo && authInfo.expirationDate && authInfo.expirationDate > now) {
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      this.setAuthTimer(expiresIn/1000);
      this.token = authInfo.token;
      this.isLoggedIn = true;
      this.authStatus.next(true);
      this.router.navigate(['/profile']);
    }
  }

  logOut() {
    this.isLoggedIn = false;
    this.token = '';
    this.postsService.posts = [];
    this.clearAuthData();
    this.authStatus.next(false);
    this.router.navigate(['']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
      clearTimeout(this.tokenTimer);
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    this.saveUserData();
  }

  saveUserData() {
    localStorage.setItem("name", this.username);
    localStorage.setItem("email", this.email);
    localStorage.setItem("bio", this.bio);
    localStorage.setItem("imagePath", this.imagePath);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("bio");
    localStorage.removeItem("imagePath");
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    this.username = localStorage.getItem("name")!;
    this.email = localStorage.getItem("email")!;
    this.bio = localStorage.getItem("bio")!;
    this.imagePath = localStorage.getItem("imagePath")!;
    return  {
      token: token,
      expirationDate: new Date(expirationDate)
    } 
  }
}
