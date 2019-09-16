import { Component, OnInit } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { any } from 'codelyzer/util/function';

@Component({
  selector: 'jhi-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.scss']
})
export class ListCartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
