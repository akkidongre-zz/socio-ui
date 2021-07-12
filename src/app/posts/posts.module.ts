import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    CreatePostComponent,
    ViewPostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    MatCardModule
  ]
})
export class PostsModule { }
