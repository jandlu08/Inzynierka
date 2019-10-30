import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddIngredientGQL, AddIngredientInput, IngredientType} from '../../../../generated/graphql';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent implements OnInit, OnDestroy {

  ingredient: AddIngredientInput;
  ingredientTypes = {
    other: IngredientType.Other,
    dairy: IngredientType.Dairy,
    fish: IngredientType.Fish,
    fruit: IngredientType.Fruit,
    vegetable: IngredientType.Vegetable,
    spice: IngredientType.Spice,
    meat: IngredientType.Meat,
    grain: IngredientType.Grain,
  };

  private subscription: Subscription = new Subscription();

  constructor(public dialogRef: MatDialogRef<AddIngredientComponent>,
              private addIngredientGQL: AddIngredientGQL,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.ingredient = {
      calories: 0,
      description: '',
      ingredientType: IngredientType.Other,
      name: '',
      photoId: null,
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addIngredient() {
    this.subscription.add(
      this.addIngredientGQL
        .mutate({ingredient: this.ingredient})
        .subscribe(result =>{
          if(result == null){
            this.snackBar.open("Ingredient was not added.",
              "OK", {duration: 3000});
          }
          else{
            this.dialogRef.close({data: true});
          }
        })
    )
  }

  cancel() {
    this.dialogRef.close({data: false});
  }

}
