import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddIngredientComponent} from '../modals/add-ingredient/add-ingredient.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddRecipeComponent} from '../modals/add-recipe/add-recipe.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  isLogged$: Observable<boolean>;

  subscription: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.isLogged$ = this.userService.getIsLogged();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  openAddIngredient() {
    const dialogRef = this.dialog.open(AddIngredientComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(isIngredientCreated => {
      if(isIngredientCreated.data) {
        this.snackBar.open("Ingredient was added!",
          "OK", {duration: 3000});
      }

    })
  }

  openAddRecipe() {

    const dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(isRecipeCreated => {
      if(isRecipeCreated.data) {
        this.snackBar.open("Recipe was added!",
          "OK", {duration: 3000});
      }

    })
  }

  openUserInfo(){
    this.router.navigateByUrl('/user');
  }



}
