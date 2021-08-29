import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password).then(_ => {
        this.router.navigateByUrl('/home');
      }).catch(console.log);
    }
  }
}
