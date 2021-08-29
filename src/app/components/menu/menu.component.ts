import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  public items: Array<any> = [
    {
      title: 'Home',
      icon: 'dashboard',
      route: 'home',
    }, {
      title: 'Sites',
      icon: 'dvr',
      route: 'sites',
    }, {
      title: 'Pages',
      icon: 'connected_tv',
      route: 'pages',
    }, {
      title: 'Usuarios',
      icon: 'person',
      route: 'user',
    },
  ];

  @ViewChild('drawer') public menu!: MatDrawer;

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private menuService: MenuService,
  ) {
    const user = JSON.parse(this.storage.get('user') || '{}');
    if (user.type !== 'admin') {
      this.items.splice(1, 1);
      this.items.splice(2, 1);
    }
  }

  ngAfterViewInit(): void {
    this.menuService.setDrawer(this.menu);
  }

  logout(): void {
    this.authService.logout();
  }

}
