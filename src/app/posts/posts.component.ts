import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Post } from '../models/post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  postsLoaded = false;
  postsEmpty = false;

  constructor(
    private apiService: ApiService,
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.postsService.posts.length === 0) {
      this.fetchPosts();
    } else {
      this.posts = this.postsService.posts;
      this.postsLoaded = true;
    }
  }

  fetchPosts() {
    this.apiService.fetchPosts().subscribe((postsData) => {
      this.posts = postsData.posts;
      this.postsService.posts = postsData.posts;
      this.postsLoaded = true;
      if (this.posts.length === 0) this.postsEmpty = true;
    }, (error) => {
      console.log(error);
    });
  }

  redirectToPost(i: number) {
    const selectedPost = this.posts[i];
    this.postsService.selectedPost = selectedPost;
    this.router.navigate(['view-post'], {relativeTo: this.route});
  }

}
