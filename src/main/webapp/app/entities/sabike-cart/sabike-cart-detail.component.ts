import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISABIKECart } from 'app/shared/model/sabike-cart.model';

@Component({
  selector: 'jhi-sabike-cart-detail',
  templateUrl: './sabike-cart-detail.component.html'
})
export class SABIKECartDetailComponent implements OnInit {
  sABIKECart: ISABIKECart;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKECart }) => {
      this.sABIKECart = sABIKECart;
    });
  }

  previousState() {
    window.history.back();
  }
}
