import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddIngredientComponent} from './add-ingredient/add-ingredient.component';
import {FormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../core/material.module';
import {AddRecipeComponent} from './add-recipe/add-recipe.component';
import {IngredientInfoComponent} from './ingredient-info/ingredient-info.component';


@NgModule({
  declarations: [AddIngredientComponent, AddRecipeComponent, IngredientInfoComponent],
  entryComponents: [AddIngredientComponent, AddRecipeComponent, IngredientInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
  ]
})
export class ModalsModule {
}
