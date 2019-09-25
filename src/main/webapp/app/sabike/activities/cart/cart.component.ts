import { Component, OnInit } from '@angular/core';
import { IOrderItems } from 'app/shared/model/order-items.model';
import { CommandService } from 'app/entities/command';
import { AccountService } from 'app/core';
import { DialogConnectComponent } from 'app/sabike/components/dialog-connect/dialog-connect.component';
import { MatDialog } from '@angular/material/dialog';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'app/sabike/services/navigation-service';

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
    private commandService: CommandService,
    private navigationService: NavigationService
  ) {
    //
  }

  ngOnInit() {
    if (this.commandService.getCart !== null && this.commandService.getCart.orderItems.length !== 0) {
      this.orderItems = this.commandService.getCart.orderItems;

      this.orderItems.map(item => {
        this.totalPrice += item.paidPrice;
        this.numberOfItems += item.quantity;
      });

      // Observe future changes
      this.commandService.listenTotalCount().subscribe(quantity => {
        this.numberOfItems = quantity;
        // this.numberOfItemsString = this.numberOfItems.toString();
        // update total price
        this.totalPrice = 0.0;
        this.commandService.getCart.orderItems.map(item => (this.totalPrice += item.paidPrice));
      });
    }

    this.commandService.cartReadyListener().subscribe(next => {
      this.orderItems = next.orderItems;
      this.orderItems.map(item => {
        this.totalPrice += item.paidPrice;
        this.numberOfItems += item.quantity;
      });
    });

    this.eventManager.subscribe('authenticationSuccess', message => {
      if (message.content === 'connected') {
        if (this.navigationService.checkIfLoginFromCheckoutCall()) {
          this.router.navigate(['/checkout'], { relativeTo: this.route }).then(r => console.log(r));
          this.navigationService.requestLoginFromCheckoutCall(false);
        }
      }
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  openConnectDialog(): void {
    this.navigationService.requestLoginFromCheckoutCall(true);
    this.dialogConnect.open(DialogConnectComponent, {
      autoFocus: true
    });
  }
}
