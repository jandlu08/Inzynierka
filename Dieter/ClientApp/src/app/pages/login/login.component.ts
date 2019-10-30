import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {
  LoginUserGQL,
  LoginUserMutation,
  LoginUserMutationVariables,
  User,
  UsersQuery,
  UsersQueryVariables
} from '../../generated/graphql';
import {QueryRef} from 'apollo-angular';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;


  constructor(private loginUserGQL: LoginUserGQL,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }


  login() {
    this.loginUserGQL
      .mutate({username: this.username, password: this.password})
      .subscribe(result => {

        this.userService.changeUser(result.data.loginUser);

        this.router.navigateByUrl('/main');
      })
  }

  register() {
    this.router.navigateByUrl('/register');
  }


}
