import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
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

  getAllTags() {
    return sample_tags
  }

  getAllFoodsByTag(tag:string) {
    return tag === 'All'?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag))
  }

  getFoodById(foodId : string) {
    return this.getAll().find(food => food.id == foodId) ?? new Food
  }
}
