import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../../../generated/graphql';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private _user: Subject<User> = new Subject<User>();
  private _isLoggedObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  readonly user: Observable<User> = this._user.asObservable();
  readonly isLoggedObs: Observable<boolean> = this._isLoggedObs.asObservable();

  isLogged: boolean = false;

  constructor(private cookieService: CookieService) {
  }


  changeUser(user: User) {
    this.isLogged = user != null;
    this._isLoggedObs.next(this.isLogged);
    this.cookieService.set("user",JSON.stringify(user),7);
    this.cookieService.set("isLogged",JSON.stringify(this.isLogged),7);
    this._user.next(user);
  }

  logout(){
    this.changeUser(null);
  }

  getUser() {
    return this.user;
  }

  getIsLogged(){
    return this.isLoggedObs;
  }

  refreshCookies(){
    this._user.next(JSON.parse(this.cookieService.get("user")));
    this.isLogged = JSON.parse(this.cookieService.get("isLogged"))
    this._isLoggedObs.next(this.isLogged);
  }


}
