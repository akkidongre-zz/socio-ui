import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/models/post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;
  isCreating = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private postsService: PostsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  createPost() {
    if (!this.postForm.valid) {
      return;
    }

    this.isCreating = true;

    const post: Post = {
      id: '',
      title: this.postForm.get('title')?.value,
      content: this.postForm.get('content')?.value
    }
    this.apiService.addPost(post).subscribe((data) => {
      post.id = data.id;
      let posts = this.postsService.posts;
      posts.push(post);
      console.log(posts);
      this.postsService.posts = posts;

      this.snackbar.open("Post created successfully", "Yay!", {
        duration: 3000
      });
      this.isCreating = false;
      this.postForm.patchValue({
        title: '',
        content: ''
      });
      this.postForm.reset();
      // this.postForm.get('title')?.clearValidators();
      // this.postForm.get('title')?.updateValueAndValidity();
      // this.postForm.get('content')?.clearValidators();
      // this.postForm.get('content')?.updateValueAndValidity();
      // this.postForm.updateValueAndValidity();
    }, (error) => {
      this.isCreating = false;
      this.snackbar.open("Could not create post", "Oh!", {
        duration: 3000
      });
    });
  }

}
