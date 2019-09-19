import { Component, OnInit } from '@angular/core';
import { IOrderItems } from 'app/shared/model/order-items.model';
import { CommandService } from 'app/entities/command';
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
  totalPrice = 0.0;
  numberOfItems = 0;

  constructor(
    private accountService: AccountService,
    private dialogConnect: MatDialog,
    private eventManager: JhiEventManager,
    private router: Router,
    private route: ActivatedRoute,
    private commandService: CommandService
  ) {}

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
    this.eventManager.subscribe('authenticationSuccess', message => {
      if (message.content === 'connected') {
        this.router.navigate(['/checkout'], { relativeTo: this.route }).then(r => console.log(r));
      }
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  openConnectDialog(): void {
    this.dialogConnect.open(DialogConnectComponent);
  }
}
