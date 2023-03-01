import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PromtService } from 'src/app/services/promt.service';
import { Promt } from 'src/app/shared/models/Promt';

@Component({
  selector: 'app-promt-page',
  templateUrl: './promt-page.component.html',
  styleUrls: ['./promt-page.component.scss']
})
export class PromtPageComponent implements OnInit {

  promt! : Promt

  constructor(activatedRoute: ActivatedRoute,
              promtService : PromtService,
              private cartService : CartService,
              private router: Router ) {
      activatedRoute.params.subscribe((params) => {
        if (params.id)
            promtService.getFoodById(params.id).subscribe(serverFood => {
              this.promt = serverFood
           })
      })
  }

  ngOnInit(): void {
  }

  addToCart() {
      //this.cartService.addToCart(this.promt)
      //this.router.navigateByUrl('/cart-page')
  }
}
