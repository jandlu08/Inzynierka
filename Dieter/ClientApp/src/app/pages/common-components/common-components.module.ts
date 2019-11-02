import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {CustomMaterialModule} from '../../core/material.module';
import {CommentsListComponent} from './comments-list/comments-list.component';
import {IngredientsListComponent} from './ingredients-list/ingredients-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [RecipesListComponent, CommentsListComponent, IngredientsListComponent],
  exports: [
    RecipesListComponent,
    CommentsListComponent,
    IngredientsListComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FlexLayoutModule,
    AngularSvgIconModule,
    HttpClientModule,
  ]
})
export class CommonComponentsModule {
}
