import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: 'edit-profile', component: EditProfileComponent},
  { path: '', pathMatch: 'full', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
