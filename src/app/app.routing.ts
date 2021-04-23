import { Routes } from '@angular/router';
import { ConfigPagesComponent } from './pages/config-pages/config-pages.component';
import { ConfigSitesComponent } from './pages/config-sites/config-sites.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'sites', component: ConfigSitesComponent },
  { path: 'pages', component: ConfigPagesComponent },
];