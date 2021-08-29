import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorList } from '../helpers/errorList';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private snackBar: MatSnackBar,
    ) { }

    public apiError(errorKey: string): void {
        const message: string = errorList[errorKey];
        this.error(message);
    }
    public error(message: string): void {
        this.snackBar.open(message, '', { duration: 3000 });
    }
}