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
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FriendsComponentComponent } from './components/friends-component/friends-component.component';
import { GroupsComponentComponent } from './components/groups-component/groups-component.component';
import { AddComponentComponent } from './components/add-component/add-component.component';
import { DashboardComponentComponent } from './components/dashboard-component/dashboard-component.component';
import { ProfileComponentComponent } from './components/profile-component/profile-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarNavComponent,
    TopbarComponent,
    FriendsComponentComponent,
    GroupsComponentComponent,
    AddComponentComponent,
    DashboardComponentComponent,
    ProfileComponentComponent
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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
