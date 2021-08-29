import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FileInputConfig, MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from './material.module';
import { ConfigPagesComponent } from './pages/config-pages/config-pages.component';
import { ConfigSitesComponent } from './pages/config-sites/config-sites.component';
import { EditPagesComponent } from './pages/edit-pages/edit-pages.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { HeaderService } from './services/header.service';
import { MenuService } from './services/menu.service';
import { PagesService } from './services/pages.service';
import { SitesService } from './services/sites.service';
import { StorageService } from './services/storage.service';
import { UsersService } from './services/users.service';

export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};

const pages = [
  ConfigPagesComponent,
  EditPagesComponent,
  ConfigSitesComponent,
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
  ApiService,
  StorageService,
  AuthService,
  UsersService,
  SitesService,
  PagesService,
];


@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...components,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialFileInputModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ...services,
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config },
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }
