import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll() : Food[] {
      return sample_foods
  }

  getAllFoodsBySerachTerm( searchTerm : string) {
      return sample_foods.filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  }

}
