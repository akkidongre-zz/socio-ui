import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'profile', 
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuardService]
  },
  { path: 'posts', 
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    canActivate: [AuthGuardService]
  },
  { path: '', pathMatch: 'full', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
