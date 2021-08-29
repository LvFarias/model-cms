import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HeaderService } from './services/header.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pageTitle: string = '';
  public pageActions: Array<any> = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private headerService: HeaderService,
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.headerService.setRoute(val.url);
        setTimeout(() => {
          this.pageTitle = this.headerService.title;
          this.pageActions = this.headerService.actions;
        }, 200);
      }
    });
  }
}
