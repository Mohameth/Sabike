import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/entities/cart';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { AccountService } from 'app/core';
import { DialogConnectComponent } from 'app/sabike/components/dialog-connect/dialog-connect.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderItems: IOrderItems[];

  constructor(private cartService: CartService, private accountService: AccountService, private dialogConnect: MatDialog) {
    //
  }

  ngOnInit() {
    if (this.cartService.cart.orderItem.length !== 0) {
      this.orderItems = this.cartService.cart.orderItem;
    }
    console.log('++++++++++++++++ORDER CART ', this.orderItems);
  }

  onCartOrderClick() {
    // If connected
    // If not connected
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  openConnectDialog(): void {
    const dialogRef = this.dialogConnect.open(DialogConnectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
