import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {
  Comment,
  GetCommentsGQL,
  GetRecipeGQL,
  GetRecipeIngredientsGQL,
  Ingredient,
  Recipe
} from '../../../generated/graphql';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.scss']
})
export class RecipeInfoComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  comments: Comment[];
  ingredients: Ingredient[];

  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private getRecipeGQL: GetRecipeGQL,
              private getCommentsGQL: GetCommentsGQL,
              private getRecipeIngredientsGQL: GetRecipeIngredientsGQL) {
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.getRecipe(recipeId);
    this.getComments(recipeId);
    this.getIngredients(recipeId);


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getRecipe(recipeId: string) {
    this.subscription.add(this.getRecipeGQL
      .fetch({recipeId})
      .subscribe(result => {
        this.recipe = result.data.getRecipe;
        console.warn( this.recipe)

      }));
  }
  private getComments(recipeId: string){
    this.subscription.add(this.getCommentsGQL
      .fetch({recipeId})
      .subscribe(result => {
        this.comments = result.data.getComments;
      }));
  }
  private getIngredients(recipeId: string){
    this.subscription.add(this.getRecipeIngredientsGQL
      .fetch({recipeId})
      .subscribe(result => {
        this.ingredients = result.data.getIngredients;
      }));
  }

}
