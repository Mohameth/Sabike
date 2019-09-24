import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConnectComponent } from 'app/sabike/components/dialog-connect/dialog-connect.component';
// Services
import { AccountService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
// Misc
import { CommandService } from 'app/entities/command';
import { ClientService } from 'app/entities/client';
import { IOrderItems } from 'app/shared/model/order-items.model';
import { Observable, Subject } from 'rxjs';
import { ICommand } from 'app/shared/model/command.model';
import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  inProduction: boolean;
  swaggerEnabled: boolean;
  version: string;
  numberOfItems = 0;
  userName: string = null;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private dialogConnect: MatDialog,
    private commandService: CommandService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    this.commandService.listenTotalCount().subscribe(quantity => {
      this.numberOfItems = quantity;
    });

    this.accountService.getAccName().subscribe(identity => {
      this.userName = identity;
      this.commandService.hasCartAsPromise(this.accountService.userIdentityId).then(msg => {
        // we have already a cart in remote
        if (msg.body[0] !== undefined) {
          const localCart = this.commandService.getCart;
          // we have also a cart in local
          if (localCart !== null && localCart.orderItems.length !== 0) {
            this.clientService.get(this.accountService.userIdentityId).then(client => {
              this.commandService.mergeRemoteCartWithLocalCart(this.accountService.userIdentityId, msg.body[0]).then(cart => {
                // console.log('CART MERGE YEAH :', cart);
              });
            });
            // we have RemoteCart but not local => reload remote cart
          } else {
            this.commandService.reloadCart(msg.body[0]);
            // update it in cart component
            this.commandService.cartReadyNext(this.commandService.getCart);
          }
          // we don't have a remote cart
        } else {
          const localCart = this.commandService.getCart;
          if (localCart !== null && localCart.orderItems.length !== 0) {
            this.clientService.get(this.accountService.userIdentityId).then(client => {
              this.commandService.createRemoteCartFromLocalCart(client).then(cart => {
                console.log('CART NEW YEAH :', cart);
              });
            });
          }
        }
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.userName = null;
    this.loginService.logout();
    this.commandService.emptyCart();
    this.router.navigate(['']).then(r => console.log(r));
  }

  openConnectDialog(): void {
    this.dialogConnect.open(DialogConnectComponent);
  }
}
