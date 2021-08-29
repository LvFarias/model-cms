import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(
        private api: ApiService,
    ) { }

    public list(page: number, limit = 10): Promise<any> {
        return this.api.get('users', { page, limit });
    }
}