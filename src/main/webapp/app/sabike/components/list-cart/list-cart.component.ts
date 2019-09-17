import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { any } from 'codelyzer/util/function';
import { IOrderItems } from 'app/shared/model/order-items.model';

@Component({
  selector: 'jhi-list-cart',
  templateUrl: './list-cart.component.html',
  styleUrls: ['./list-cart.component.scss']
})
export class ListCartComponent implements OnInit {
  @Input() orderItems: Array<IOrderItems>;

  constructor() {}

  ngOnInit() {}
}
