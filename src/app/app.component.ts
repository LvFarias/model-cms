import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLogged = true;
  public pageTitle: string = '';
  public pageActions: Array<any> = [];

  constructor(
    private router: Router,
    private headerService: HeaderService,
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.headerService.setRoute(val.url);
        this.pageTitle = this.headerService.title;
        this.pageActions = this.headerService.actions;
      }
    });
  }
}
