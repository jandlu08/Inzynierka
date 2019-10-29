import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../core/services/user.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  isLogged$: Observable<boolean>;

  subscription: Subscription;

  constructor(private router: Router,
              private userService: UserService) {
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



}
