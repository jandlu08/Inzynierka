import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {CustomMaterialModule} from './core/material.module';
import {NavMenuComponent} from './pages/nav-menu/nav-menu.component';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './pages/register/register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './core/services/user.service';
import {ModalsModule} from './pages/modals/modals.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    RegisterComponent,
    MainPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CustomMaterialModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ModalsModule,
  ],
  providers: [CookieService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
