import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AuthGuard} from './core/guards/auth.guard';
import {UserInfoComponent} from './pages/user-info/user-info.component';
import {RecipeInfoComponent} from './recipe-info/recipe-info.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', canActivate: [AuthGuard],
    component: MainPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'user',  canActivate: [AuthGuard], component: UserInfoComponent},
  {path:'recipe/:recipeId', canActivate:[AuthGuard], component:RecipeInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
