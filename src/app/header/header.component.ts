import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  authStatusSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.authStatus.subscribe((loginStatus) => {
      this.isLoggedIn = loginStatus;
    });
  }

  logout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }

}
