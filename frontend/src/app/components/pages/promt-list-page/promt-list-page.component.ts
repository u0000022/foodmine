import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { PromtService } from 'src/app/services/promt.service';
import { Food } from 'src/app/shared/models/food';
import { Promt } from 'src/app/shared/models/Promt';

@Component({
  selector: 'app-promt-list-page',
  templateUrl: './promt-list-page.component.html',
  styleUrls: ['./promt-list-page.component.scss']
})
export class PromtListPageComponent implements OnInit {

  promts : Promt[] = []
  constructor(
    private promtService: PromtService,
            activatedRoute : ActivatedRoute
  ) {

    let promtsObservable :  Observable<Promt[]>
    activatedRoute.params
    .subscribe((params) => {
       if (params.searchTerm) {
          //foodsObservable = this.promtService.getAllFoodsBySerachTerm(params.searchTerm)
       } else if (params.tag) {
        //foodsObservable = this.promtService.getAllFoodsByTag(params.tag)
       }
       else {
        promtsObservable = promtService.getAll()
       }

       promtsObservable.subscribe((serverFood) => {
         this.promts  = serverFood
       })

    })

   }

  ngOnInit(): void {

  }



}
