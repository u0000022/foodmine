import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  foods : Food[] = []
  constructor(
    private foodService: FoodService,
            activatedRoute : ActivatedRoute
  ) {

    let foodsObservable :  Observable<Food[]>
    activatedRoute.params
    .subscribe((params) => {
       if (params.searchTerm) {
          foodsObservable = this.foodService.getAllFoodsBySerachTerm(params.searchTerm)
       } else if (params.tag) {
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag)
       }
       else {
        foodsObservable = foodService.getAll()
       }

       foodsObservable.subscribe((serverFood) => {
         this.foods  = serverFood
       })

    })

   }

  ngOnInit(): void {

  }

}
