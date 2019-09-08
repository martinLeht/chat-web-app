import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile-component/profile-component.component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component.component';
import { FriendsComponent } from './components/friends-component/friends-component.component';
import { GroupsComponent } from './components/groups-component/groups-component.component';
import { AddComponent } from './components/add-component/add-component.component';


const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: '', component: DashboardComponent},
  {path: 'frineds', component: FriendsComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'add', component: AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
