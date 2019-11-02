import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DietGeneratorService {

  private _isDietInputProvidedObs: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isDietInputProvidedObs: Observable<boolean> = this._isDietInputProvidedObs.asObservable();
  isDietInputProvided: boolean = false;
  calories: number;
  amount: number;

  constructor(private cookieService: CookieService) {
    this.cookieService.set('calories', JSON.stringify(0), 7);
    this.cookieService.set('amount', JSON.stringify(0), 7);

    this.cookieService.set('isDietInputProvided', JSON.stringify(false), 7);

  }

  changeIsDietInputProvided(isDietInputProvided: boolean) {

    this.isDietInputProvided = isDietInputProvided;
    this.cookieService.set('isDietInputProvided', JSON.stringify(this.isDietInputProvided), 7);
    this._isDietInputProvidedObs.next(isDietInputProvided);
  }

  changeCalories(calories: number) {
    this.calories = calories;
    this.cookieService.set('calories', JSON.stringify(this.calories), 7);
  }

  changeAmount(amount: number) {
    this.amount = amount;
    this.cookieService.set('amount', JSON.stringify(this.amount), 7);
  }

  getIsDietInputProvided() {
    return this.isDietInputProvidedObs;
  }

  refreshCookies() {
    this.calories = JSON.parse(this.cookieService.get('calories'));
    this.amount = JSON.parse(this.cookieService.get('amount'));


    this.isDietInputProvided = JSON.parse(this.cookieService.get('isDietInputProvided'));
    this._isDietInputProvidedObs.next(this.isDietInputProvided);
  }
}
