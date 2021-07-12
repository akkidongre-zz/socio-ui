import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
import { AuthData } from './models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_BASE = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  fetchPosts() {
    return this.http.get<{posts: Post[]}>(`${this.API_BASE}posts`);
  }

  addPost(postData: Post) {
    return this.http.post<{id: string, message: string}>(`${this.API_BASE}posts`, postData);
  }

  loginSocialUser(userData: {name: string, email: string, password: string, imagePath: string, expiresIn: number}) {
    return this.http.post<{message: string, token: string, expiresIn: number, bio: string, imagePath: string}>(`${this.API_BASE}user/socialSignin`, userData)
  }

  loginUser(userData: AuthData) {
    return this.http.post<{message: string, token: string, expiresIn: number, bio: string, imagePath: string}>(`${this.API_BASE}user/signin`, userData);
  }

  editProfile(userData: FormData) {
    return this.http.put<{message: string, imagePath: string}>(`${this.API_BASE}user/edit`, userData);
  }

  editProfileAsJson(userData: {name: string, bio: string, imagePath: string}) {
    return this.http.put<{message: string}>(`${this.API_BASE}user/editAsJson`, userData);
  }
}
