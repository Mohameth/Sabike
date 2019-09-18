import { Component, OnInit } from '@angular/core';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { CommandService } from 'app/entities/command';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderItems: IOrderItems[];
  totalPrice = 0.0;
  numberOfItems = 0;

  constructor(private commandService: CommandService) {}

  ngOnInit() {
    if (this.commandService.getCart !== null && this.commandService.getCart.orderItems.length !== 0) {
      this.orderItems = this.commandService.getCart.orderItems;

      this.commandService.listenTotalCount().subscribe(quantity => {
        console.log(quantity);
        this.numberOfItems = quantity;

        // update total price
        this.totalPrice = 0.0;
        this.commandService.getCart.orderItems.map(item => (this.totalPrice += item.paidPrice));
      });

      this.orderItems.map(item => {
        this.totalPrice += item.paidPrice;
        this.numberOfItems += item.quantity;
      });
    }
    console.log('++++++++++++++++ORDER CART ', this.orderItems);
    console.log('totalPRica in CART : ', this.totalPrice);
  }
}
