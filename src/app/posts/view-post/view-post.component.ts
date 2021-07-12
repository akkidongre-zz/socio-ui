import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  selectedPost: Post;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.selectedPost = this.postsService.selectedPost;
  }

}
