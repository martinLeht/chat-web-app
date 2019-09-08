import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  sidenavOpened: boolean = true;
  sidenavMode: string = 'side';

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.handleResizeWindow(window.innerWidth);
      });
    };
  }

  ngOnInit() {
    this.handleResizeWindow(window.innerWidth);
  }

  private handleResizeWindow(width: number) {
    if (width > 800) {
      //Wide screen
      this.sidenavOpened = true;
      this.sidenavMode = 'side';
    } else {
      //Mobile
      this.sidenavOpened = false;
      this.sidenavMode = 'over';
    }
  }
}
