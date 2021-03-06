import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment, GetRecipeIngredientsGQL, Ingredient} from '../../../../generated/graphql';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddIngredientComponent} from '../../modals/add-ingredient/add-ingredient.component';
import {IngredientInfoComponent} from '../../modals/ingredient-info/ingredient-info.component';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit, OnDestroy {

  @Input() recipeId: string;

  ingredients: Ingredient[];
  loading: boolean = true;
  pageSize: number = 5;
  pageLength: number = 5;
  slicedIngredients: Array<Ingredient> = new Array<Ingredient>();
  private subscription: Subscription = new Subscription();
  constructor( private getRecipeIngredientsGQL: GetRecipeIngredientsGQL,
               public dialog: MatDialog) { }

  ngOnInit() {
    this.getIngredients();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.slicedIngredients = this.ingredients.slice(offset).slice(0, event.pageSize);
    this.pageLength = this.ingredients.length;
  }

  openIngredientInfo(ingredient: Ingredient){
    this.dialog.open(IngredientInfoComponent, {
      width: '800px', data: ingredient.description
    },);
  }

  private getIngredients(){
    this.subscription.add(this.getRecipeIngredientsGQL
      .fetch({recipeId: this.recipeId})
      .subscribe(result => {
        this.loading = result.loading;
        this.ingredients = result.data.getIngredients;
        this.slicedIngredients = this.ingredients.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
        this.pageLength = this.ingredients.length;
      }));
  }

}
