import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MenuService } from 'src/app/services/menu.service';

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
    },
  ];

  @ViewChild('drawer') public menu!: MatDrawer;

  constructor(private menuService: MenuService) {
  }

  ngAfterViewInit(): void {
    this.menuService.setDrawer(this.menu);
  }

}
