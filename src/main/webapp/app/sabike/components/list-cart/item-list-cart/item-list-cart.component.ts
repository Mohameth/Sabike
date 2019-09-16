import { Component, Input, OnInit } from '@angular/core';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';

@Component({
  selector: 'jhi-item-list-cart',
  templateUrl: './item-list-cart.component.html',
  styleUrls: ['./item-list-cart.component.scss']
})
export class ItemListCartComponent implements OnInit {
  selectedQuantity = 4; // default
  @Input() orderItem: OrderItems;

  constructor() {}

  ngOnInit() {
    this.selectedQuantity = this.orderItem.quantity;
  }
}
