import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	private localStorage: Storage = localStorage;

	// constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) { }

	public clear(): void {
		this.localStorage.clear();
	}

	public get(key: string): string | null {
		return this.localStorage.getItem(key);
	}

	public removeItem(key: string): void {
		this.localStorage.removeItem(key);
	}

	public setItem(key: string, value: string): void {
		this.localStorage.setItem(key, value);
	}
}
