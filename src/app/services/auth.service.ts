import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    public isLogged = false;

    constructor(
        private router: Router,
        private api: ApiService,
        private storage: StorageService,
    ) {
        this.isLogged = !!this.storage.get('user');
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.isLogged) {
            this.router.navigateByUrl('/login');
        }
        return this.isLogged;
    }

    public login(email: string, password: string): Promise<any> {
        return this.api.post('login', { email, password }).then(user => {
            this.isLogged = true;
            this.storage.setItem('user', JSON.stringify(user));
            this.storage.setItem('token', user.token);
            this.storage.setItem('currentSiteId', user.siteId);
        })
    }

    public logout(): void {
        this.storage.clear();
        this.isLogged = false;
        this.router.navigateByUrl('/login');
    }
}