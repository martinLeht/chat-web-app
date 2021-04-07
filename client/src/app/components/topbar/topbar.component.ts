import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {


  @Input()
  sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleSidenav(event) {
    this.sidenav.mode = 'over';
    this.sidenav.toggle();
  }

}
