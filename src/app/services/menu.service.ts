import { Injectable, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable()
export class MenuService {
    public menu!: MatDrawer;

    public setDrawer(drawer: MatDrawer) {
        this.menu = drawer;
    }

    public open() {
        return this.menu.open();
    }


    public close() {
        return this.menu.close();
    }

    public toggle(): void {
        this.menu.toggle();
    }
}