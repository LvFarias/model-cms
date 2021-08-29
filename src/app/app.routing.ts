import { Routes } from '@angular/router';
import { ConfigPagesComponent } from './pages/config-pages/config-pages.component';
import { ConfigSitesComponent } from './pages/config-sites/config-sites.component';
import { EditPagesComponent } from './pages/edit-pages/edit-pages.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AuthService } from './services/auth.service';


export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthService]
  },
  {
    path: 'sites',
    component: ConfigSitesComponent,
    canActivate: [AuthService]
  },
  {
    path: 'pages',
    component: ConfigPagesComponent,
    canActivate: [AuthService]
  },
  {
    path: 'pages/:id',
    component: EditPagesComponent,
    canActivate: [AuthService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  }
];