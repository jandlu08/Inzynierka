import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription} from 'rxjs';
import {GetUserRecipesGQL, Recipe, User} from '../../../generated/graphql';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user: User;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }


}
