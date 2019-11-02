import { Injectable } from '@angular/core';
import {Difficulty, IngredientType, VoteType} from '../../../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class CommonTypesService {

  ingredientTypes = {
    other: IngredientType.Other,
    dairy: IngredientType.Dairy,
    fish: IngredientType.Fish,
    fruit: IngredientType.Fruit,
    vegetable: IngredientType.Vegetable,
    spice: IngredientType.Spice,
    meat: IngredientType.Meat,
    grain: IngredientType.Grain,
  };

  difficultyTypes ={
    veryEasy: Difficulty.VeryEasy,
    easy: Difficulty.Easy,
    medium: Difficulty.Medium,
    hard: Difficulty.Hard,
    veryHard: Difficulty.VeryHard,
  };

  voteTypes = {
    down: VoteType.Down,
    up: VoteType.Up,
  };

  constructor() { }
}
