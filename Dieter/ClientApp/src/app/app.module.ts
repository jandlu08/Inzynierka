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
import {CommonTypesService} from './core/services/common-types.service';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { RecipeInfoComponent } from './pages/recipe-info/recipe-info.component';
import {CommonComponentsModule} from './pages/common-components/common-components.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import {AngularSvgIconModule} from 'angular-svg-icon';
import { GenerateDietComponent } from './pages/generate-diet/generate-diet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    RegisterComponent,
    MainPageComponent,
    UserInfoComponent,
    RecipeInfoComponent,
    GenerateDietComponent,

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
    CommonComponentsModule,
    FlexLayoutModule,
    AngularSvgIconModule,
  ],
  providers: [CookieService, UserService, CommonTypesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
