import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ExploreComponent } from './components/explore/explore.component';


const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: '', component: DashboardComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'explore', component: ExploreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
