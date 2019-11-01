import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {
  GetRecipeGQL,
  Recipe
} from '../../../generated/graphql';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.scss']
})
export class RecipeInfoComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private getRecipeGQL: GetRecipeGQL,
             ) {
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.getRecipe(recipeId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getRecipe(recipeId: string) {
    this.subscription.add(this.getRecipeGQL
      .fetch({recipeId})
      .subscribe(result => {
        this.loading = result.loading;
        this.recipe = result.data.getRecipe;
      }));
  }



}
