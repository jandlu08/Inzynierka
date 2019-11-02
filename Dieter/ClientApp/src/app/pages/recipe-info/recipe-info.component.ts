import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {
  GetRecipeGQL,
  Recipe, VoteGQL, VoteType
} from '../../../generated/graphql';
import {CommonTypesService} from '../../core/services/common-types.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../core/services/user.service';

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
              private commonTypes: CommonTypesService,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private voteGQL: VoteGQL) {
  }

  ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.getRecipe(recipeId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private vote(voteType: VoteType) {
    this.subscription.add(this.voteGQL
      .mutate({userId: this.userService.user.userId, recipeId: this.recipe.recipeId, voteType: voteType})
      .subscribe(result => {
        if (result.data.vote == null) {
          this.snackBar.open('You already voted!',
            'OK', {duration: 3000});
        } else {
          if (voteType == VoteType.Up) {
            this.recipe.rating.upVotes += 1;
          } else {
            this.recipe.rating.downVotes += 1;
          }
        }
      }));
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
