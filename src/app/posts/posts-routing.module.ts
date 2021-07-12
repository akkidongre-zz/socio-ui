import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  { path: 'create-post', component: CreatePostComponent},
  { path: 'view-post', component: ViewPostComponent},
  { path: '', pathMatch: 'full', component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
