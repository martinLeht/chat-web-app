import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  @Input()
  sidenav: MatSidenav

  constructor() { }

  ngOnInit() {
  }

  handleClickMenu(event) {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

}
