import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SitesService {
    constructor(
        private api: ApiService,
    ) { }

    public list(page: number, limit = 10): Promise<any> {
        return this.api.get('sites', { page, limit });
    }

    public getConfig(siteId: number): Promise<any> {
        return this.api.get('config/site/' + siteId);
    }

    public saveConfigs(siteId: number, configs: any): Promise<any> {
        return this.api.put('config/site/' + siteId, configs);
    }
}