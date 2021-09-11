import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class PagesService {
    constructor(
        private api: ApiService,
    ) { }

    public list(page: number, limit = 10): Promise<any> {
        return this.api.get('pages', { page, limit });
    }

    public getById(id: number): Promise<any> {
        return this.api.get('pages/' + id);
    }

    public edit(id: number, pageData: any): Promise<any> {
        return this.api.put('pages/' + id, pageData);
    }

    public editModule(id: number, moduleData: any): Promise<any> {
        return this.api.put('pages/module/' + id, moduleData);
    }

    public uploadImage(file: File): Promise<any> {
        return this.api.upload('files/upload/image', file);
    }
}