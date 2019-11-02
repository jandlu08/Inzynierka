import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  LoginUserGQL,
} from '../../../generated/graphql';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {Subscription} from 'rxjs';
import {DietGeneratorService} from '../../core/services/diet-generator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  private subscription: Subscription = new Subscription();


  constructor(private loginUserGQL: LoginUserGQL,
              private router: Router,
              private userService: UserService,
              private dietGeneratorService: DietGeneratorService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  login() {
    this.subscription.add( this.loginUserGQL
      .mutate({username: this.username, password: this.password})
      .subscribe(result => {

        this.dietGeneratorService.changeAmount(0);
        this.dietGeneratorService.changeCalories(0);
        this.userService.changeUser(result.data.loginUser);
        this.router.navigateByUrl('/main');
      }));
  }

  register() {
    this.router.navigateByUrl('/register');
  }


}
