import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule, MatInputModule, MatOptionModule, MatSelectModule, } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { UsersOnlineComponent } from './components/users-online/users-online.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarNavComponent,
    TopbarComponent,
    DashboardComponent,
    FriendsComponent,
    GroupsComponent,
    ExploreComponent,
    ProfileComponent,
    ChatWindowComponent,
    UsersOnlineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatOptionModule, 
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
