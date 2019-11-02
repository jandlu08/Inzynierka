import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DietGeneratorService} from '../../core/services/diet-generator.service';

@Component({
  selector: 'app-generate-diet',
  templateUrl: './generate-diet.component.html',
  styleUrls: ['./generate-diet.component.scss']
})
export class GenerateDietComponent implements OnInit, OnDestroy {

  isDietInputProvided$: Observable<boolean>;
  amount: number;
  calories: number;


  constructor(private dietGeneratorService: DietGeneratorService) {
  }

  ngOnInit() {
    this.calories = this.dietGeneratorService.calories;
    this.amount = this.dietGeneratorService.amount;
    if(this.calories == 0){
      this.calories = undefined;
    }
    if(this.amount == 0){
      this.amount = undefined;
    }

    this.isDietInputProvided$ = this.dietGeneratorService.getIsDietInputProvided();
  }

  ngOnDestroy(){
    this.dietGeneratorService.changeAmount(this.amount);
    this.dietGeneratorService.changeCalories(this.calories);
  }

  generateDiet(){
    this.dietGeneratorService.changeIsDietInputProvided(true);
  }
  resetDiet(){
    this.dietGeneratorService.changeIsDietInputProvided(false);
  }

}
