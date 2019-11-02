import {Injectable, OnInit} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {DietGeneratorService} from '../services/diet-generator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, OnInit {


  constructor(private userService: UserService,
              private dietGeneratorService: DietGeneratorService) {
  }

  ngOnInit(): void {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.refreshCookies();
    if (this.dietGeneratorService.calories != null)
      this.dietGeneratorService.refreshCookies();
    return this.userService.isLogged;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.refreshCookies();
    if (this.dietGeneratorService.calories != null)
      this.dietGeneratorService.refreshCookies();
    return this.userService.isLogged;
  }
}
