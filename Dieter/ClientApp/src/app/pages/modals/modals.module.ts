import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import {FormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../../core/material.module';



@NgModule({
  declarations: [AddIngredientComponent],
  entryComponents:[AddIngredientComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
  ]
})
export class ModalsModule { }
