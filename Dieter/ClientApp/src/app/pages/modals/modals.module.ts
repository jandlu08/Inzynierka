import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import {FormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../core/material.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';



@NgModule({
  declarations: [AddIngredientComponent, AddRecipeComponent],
  entryComponents:[AddIngredientComponent, AddRecipeComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
  ]
})
export class ModalsModule { }
