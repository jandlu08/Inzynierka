import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {GetUserRecipesGQL, Recipe} from '../../../../generated/graphql';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  @Input() userId: string;
  recipes: Recipe[];
  pageSize: number = 5;
  pageLength: number = 5;
  slicedRecipes: Array<Recipe> = new Array<Recipe>();
  loading: boolean = true;

  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService,
              private getUserRecipesGQL: GetUserRecipesGQL,
              private router: Router) { }

  ngOnInit() {
    this.getUserRecipes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.slicedRecipes = this.recipes.slice(offset).slice(0, event.pageSize);
    this.pageLength = this.recipes.length;
  }
  openRecipeInfo(recipeId: string){
    this.router.navigate(['/recipe',recipeId]);
  }

  private getUserRecipes(){
    this.subscription.add(
      this.getUserRecipesGQL.fetch({userId:this.userId})
        .subscribe(result =>{
          this.loading = result.loading;
          this.recipes = result.data.getUserRecipes;
          this.slicedRecipes = this.recipes.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
          this.pageLength = this.recipes.length;
        })
    )
  }

}
