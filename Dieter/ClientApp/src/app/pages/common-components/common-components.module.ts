import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import {CustomMaterialModule} from '../../core/material.module';



@NgModule({
  declarations: [RecipesListComponent],
  exports: [
    RecipesListComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule
  ]
})
export class CommonComponentsModule { }
