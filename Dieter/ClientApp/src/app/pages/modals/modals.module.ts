import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddIngredientComponent} from './add-ingredient/add-ingredient.component';
import {FormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../core/material.module';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {IngredientInfoComponent} from './ingredient-info/ingredient-info.component';
import {AddCommentComponent} from './add-comment/add-comment.component';


@NgModule({
  declarations: [
    AddIngredientComponent,
    AddRecipeComponent,
    IngredientInfoComponent,
    AddCommentComponent],
  entryComponents: [
    AddIngredientComponent,
    AddRecipeComponent,
    IngredientInfoComponent,
    AddCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
  ]
})
export class ModalsModule {
}
