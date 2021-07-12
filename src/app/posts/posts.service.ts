import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];

  selectedPost: Post;

  constructor() { }
}
