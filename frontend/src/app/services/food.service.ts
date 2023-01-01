import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_URL, FOOD_BY_ID_URL, FOOD_BY_SEARCH_URL, FOOD_BY_TAG_URL, FOOD_TAGS_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient : HttpClient ) { }

  getAll() : Observable<Food[]> {
      return this.httpClient.get<Food[]>(FOODS_URL)
  }

  getAllFoodsBySerachTerm( searchTerm : string) {
      //return sample_foods.filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
      return this.httpClient.get<Food[]>(FOOD_BY_SEARCH_URL + searchTerm)
  }

  getAllTags() : Observable<Tag[]> {
    //return sample_tags
    return this.httpClient.get<Tag[]>(FOOD_TAGS_URL)
  }

  getAllFoodsByTag(tag:string) : Observable<Food[]> {
    return tag === 'All'?
    this.getAll():
    this.httpClient.get<Food[]>(FOOD_BY_TAG_URL + tag)
  }

  getFoodById(foodId : string) : Observable<Food> {
    //return this.getAll().find(food => food.id == foodId) ?? new Food
    return this.httpClient.get<Food>(FOOD_BY_ID_URL + foodId)
  }
}
