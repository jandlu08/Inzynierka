import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GetUserInfoGQL, GetUserRecipesGQL, Recipe, User} from '../../../generated/graphql';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  user: User;
  loading: boolean = true;
  private subscription: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
              private getUserInfoGQL: GetUserInfoGQL) {
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.getUserInfo(userId);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  private getUserInfo(userId: string) {
    this.subscription.add(this.getUserInfoGQL
      .fetch({userId})
      .subscribe(result => {
        this.loading = result.loading;
        this.user = result.data.getUser;
      }))
  }


}
