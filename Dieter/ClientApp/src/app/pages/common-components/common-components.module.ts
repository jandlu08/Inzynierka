import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {CustomMaterialModule} from '../../core/material.module';
import {CommentsListComponent} from './comments-list/comments-list.component';
import {IngredientsListComponent} from './ingredients-list/ingredients-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [RecipesListComponent, CommentsListComponent, IngredientsListComponent],
  exports: [
    RecipesListComponent,
    CommentsListComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FlexLayoutModule,
  ]
})
export class CommonComponentsModule {
}
