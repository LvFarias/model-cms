import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class MyNotifications {

	constructor() { }

	public alert: typeof Swal = Swal.mixin({
		cancelButtonText: 'Cancelar',
	});

	public toast: typeof Swal = this.alert.mixin({
		toast: true,
		timer: 5000,
		position: 'top-end',
		showConfirmButton: false,
	});

	public alertError(title: string, text?: string): void {
		this.alert.fire({ icon: 'error', title, text });
	}
}

