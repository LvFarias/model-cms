import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from './material.module';
import { ConfigPagesComponent } from './pages/config-pages/config-pages.component';
import { ConfigSitesComponent } from './pages/config-sites/config-sites.component';
import { CrudComponent } from './pages/crud/crud.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { HeaderService } from './services/header.service';
import { MenuService } from './services/menu.service';
import { TableComponent } from './components/table/table.component';

const pages = [
  ConfigPagesComponent,
  ConfigSitesComponent,
  CrudComponent,
  HomeComponent,
  LoginComponent,
  UserComponent,
];

const components = [
  HeaderComponent,
  MenuComponent,
];

const services = [
  HeaderService,
  MenuService,
];


@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...components,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ...services
  ],
  bootstrap: [
    AppComponent,
  ],
})

export class AppModule { }
