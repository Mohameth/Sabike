import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/entities/cart';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { AccountService } from 'app/core';
import { DialogConnectComponent } from 'app/sabike/components/dialog-connect/dialog-connect.component';
import { MatDialog } from '@angular/material/dialog';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderItems: IOrderItems[];

  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private dialogConnect: MatDialog,
    private eventManager: JhiEventManager,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //
  }

  ngOnInit() {
    if (this.cartService.cart.orderItem.length !== 0) {
      this.orderItems = this.cartService.cart.orderItem;
    }
    console.log('++++++++++++++++ORDER CART ', this.orderItems);
    this.eventManager.subscribe('authenticationSuccess', message => {
      if (message.content === 'connected') {
        this.router.navigate(['/checkout'], { relativeTo: this.route });
      }
    });
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
    //
    // dialogRef.afterClosed().subscribe(result => {
    //
    // });
  }
}
