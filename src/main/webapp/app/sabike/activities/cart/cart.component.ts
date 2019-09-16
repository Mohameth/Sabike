import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/entities/cart';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderItems: IOrderItems[];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    if (this.cartService.cart.orderItem.length !== 0) {
      this.orderItems = this.cartService.cart.orderItem;
    }
    console.log('++++++++++++++++ORDER CART ', this.orderItems);
  }
}
