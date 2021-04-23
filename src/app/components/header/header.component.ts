import { Component, Input } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title: String = 'Home';
  @Input() actions: Array<any> = [];

  constructor(private menuService: MenuService) {
  }

  public toggleMenu() {
    this.menuService.toggle();
  }

}
