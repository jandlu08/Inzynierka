import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AddRecipeGQL,
  Difficulty,
  GetIngredientsGQL,
  Ingredient,
  IngredientType,
  RecipeInput
} from '../../../../generated/graphql';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {UserService} from '../../../core/services/user.service';
import {CommonTypesService} from '../../../core/services/common-types.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit, OnDestroy {

  recipe: RecipeInput;
  ingredients: Array<Ingredient> = new Array<Ingredient>();
  slicedIngredients: Array<Ingredient> = new Array<Ingredient>();
  savedIngredients: Map<string, Ingredient> = new Map<string, Ingredient>();
  selectedIngredients: Array<Ingredient> = new Array<Ingredient>();
  pageSize: number = 5;
  pageLength: number = 5;
  ingredientType: IngredientType = IngredientType.Other;

  private subscription: Subscription = new Subscription();
  private pageIndex: number = 0;
  private ingredientIds: Array<string> = new Array<string>();

  constructor(public dialogRef: MatDialogRef<AddRecipeComponent>,
              private snackBar: MatSnackBar,
              private addRecipeGQL: AddRecipeGQL,
              private userService: UserService,
              private commonTypes: CommonTypesService,
              private getIngredientsGQL: GetIngredientsGQL) {
  }

  ngOnInit() {
    this.getIngredients();
    this.recipe = {
      calories: 0,
      description: '',
      difficulty: Difficulty.Easy,
      estTime: 0,
      name: '',
      photoId: '',
      weight: 0,
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addRecipe() {
    this.selectedIngredients.forEach(ingredient => {
      this.savedIngredients.set(ingredient.ingredientId, ingredient);
    });

    this.savedIngredients.forEach(ingredient => {
      this.ingredientIds.push(ingredient.ingredientId);
    });
    console.warn(this.savedIngredients);
    console.warn(this.ingredientIds);
    this.subscription.add(
      this.addRecipeGQL
        .mutate({
          authorUserId: this.userService.user.userId,
          ingredients: this.ingredientIds,
          recipe: this.recipe
        })
        .subscribe(result => {
          if (result == null) {
            this.snackBar.open('Recipe was not added.',
              'OK', {duration: 3000});
          } else {
            this.dialogRef.close({data: true});
          }
        })
    )
  }


  cancel() {
    this.dialogRef.close({data: true});

  }

  onNgModelChange(event) {
    this.selectedIngredients = event;
  }

  pageChangeEvent(event) {

    this.slicedIngredients.forEach(ingredient => {
      if (this.savedIngredients.has(ingredient.ingredientId)) {
        this.savedIngredients.delete(ingredient.ingredientId);
      }
    });

    this.selectedIngredients.forEach(ingredient => {
      this.savedIngredients.set(ingredient.ingredientId, ingredient);
    });

    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.slicedIngredients = this.ingredients.filter(x => x.ingredientType === this.ingredientType)
      .slice(offset).slice(0, event.pageSize);
    this.pageLength = this.ingredients.filter(x => x.ingredientType === this.ingredientType).length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.slicedIngredients.forEach(ingredient => {
      if (this.savedIngredients.has(ingredient.ingredientId)) {
        this.selectedIngredients.push(ingredient);
      }
    });

  }

  updateList() {
    const properties = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
    };
    this.pageChangeEvent(properties);
  }


  private getIngredients() {
    this.subscription.add(
      this.getIngredientsGQL.fetch().subscribe(
        result => {
          this.ingredients = result.data.getIngredients;
          this.slicedIngredients = this.ingredients.filter(x => x.ingredientType === this.ingredientType)
            .slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
          this.pageLength = this.ingredients.filter(x => x.ingredientType === this.ingredientType).length;

        }
      )
    )
  }


}
