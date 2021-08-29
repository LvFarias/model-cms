import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    public title: string = '';
    public actions: Array<any> = [];

    public possibleTitles: any = {
        '/home': 'Home',
        '/sites': 'Sites',
        '/pages': 'Pages',
        '/configs': 'Configurações',
        '/users': 'Usuarios',
    };
    public possibleActions: any = {
        '/home': [],
        '/sites': [],
        '/pages': [],
        '/users': [],
        '/configs': [],
    };

    public setRoute(route: string) {
        this.title = this.possibleTitles[route] || '404';
        this.actions = this.possibleActions[route] || [];
    }

    public seHeaderTitle(title: string) {
        this.title = title;
    }
}