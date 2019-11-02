import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-generate-diet',
  templateUrl: './generate-diet.component.html',
  styleUrls: ['./generate-diet.component.scss']
})
export class GenerateDietComponent implements OnInit {

  isInputProvided: boolean = false;
  amount: number = undefined;
  calories: number = undefined;


  constructor() {
  }

  ngOnInit() {
  }

  generateDiet(){
    this.isInputProvided = true;
  }
  resetDiet(){
    this.isInputProvided = false;
  }

}
