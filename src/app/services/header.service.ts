import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {
    public title: string = '';
    public actions: Array<any> = [];

    public possibleTitles: any = {
        '/home': 'Home',
        '/sites': 'Sites',
        '/pages': 'Pages',
    };
    public possibleActions: any = {
        '/home': [{
            icon: 'favorite',
            function: () => console.log('favorite'),
        }, {
            icon: 'share',
            function: () => console.log('share'),
        }],
        '/sites': [{
            icon: 'share',
            function: () => console.log('share'),
        }, {
            icon: 'favorite',
            function: () => console.log('favorite'),
        }],
        '/pages': [],
    };

    public setRoute(route: string) {
        this.title = this.possibleTitles[route] || '404';
        this.actions = this.possibleActions[route] || [];
    }
}