import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    activatedRoute.params
    .subscribe((params) => {
       if (params.searchTerm) {
          this.foods = this.foodService.getAllFoodsBySerachTerm(params.searchTerm)
       } else {
          this.foods = foodService.getAll()
       }
    })

   }

  ngOnInit(): void {

  }

}
