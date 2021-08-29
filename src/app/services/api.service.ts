import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private httpOptions: any = {};

	constructor(
		private router: Router,
		private http: HttpClient,
		private storage: StorageService,
		private toastService: ToastService,
	) {
		this.setTokenHeader();
	}

	private setTokenHeader(customHeaders?: any): void {
		const headers: any = { 'Content-Type': 'application/json' };
		
		if (!!customHeaders) {
			for (const key in customHeaders) {
				if (Object.prototype.hasOwnProperty.call(customHeaders, key)) {
					const value = customHeaders[key];
					if (value == null) {
						delete headers[key];
					} else {
						headers[key] = value;
					}
				}
			}
		}

		const token = this.storage.get('token');
		if (!!token) {
			headers.Authorization = `Bearer ${token}`;
		}

		this.httpOptions.headers = new HttpHeaders(headers);
	}

	private run(method: string, url: string, body?: string | FormData, params?: any, customHeaders?: {}): Promise<any> {
		this.setTokenHeader(customHeaders);
		if (params && typeof (params) !== 'undefined') {
			this.httpOptions.params = params;
		}
		if (body && typeof (body) !== 'undefined') {
			this.httpOptions.body = body;
		}
		return new Promise((res: any, rej) => {
			this.http.request(method, env.API_URL + url, this.httpOptions).toPromise().then((response: any) => {
				this.responseHandler(response).then(res).catch(rej);
			}).catch((err: any) => {
				this.errorHandler(err);
				rej(err);
			});
		});
	}

	private errorHandler(error: any): any {
		if (error.status === 401) {
			this.storage.clear();
			this.router.navigateByUrl('/login');
		} else {
			this.toastService.apiError(error.error.error);
		}
	}

	private responseHandler(response: any): Promise<any> {
		return new Promise(res => {
			res(response.data);
		});
	}

	public get(url: string, params: any = {}): Promise<any> {
		return this.run('get', url, '', params);
	}

	public post(url: string, body: any = {}): Promise<any> {
		return this.run('post', url, body);
	}

	public put(url: string, body: any = {}): Promise<any> {
		return this.run('put', url, body);
	}

	public delete(url: string, id: string | number): Promise<any> {
		return this.run('delete', url, '', { id });
	}

	public upload(url: string, file: File): Promise<any> {
		const formData = new FormData();
		formData.append('myFile', file);

		return this.run('post', url, formData, {}, { 'Content-Type': null });
	}
}
