import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConnectComponent } from 'app/sabike/components/dialog-connect/dialog-connect.component';
// Services
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
// Misc
import { CommandService } from 'app/entities/command';
import { JhiEventManager } from 'ng-jhipster';

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
  currentAccount: any;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private dialogConnect: MatDialog,
    private commandService: CommandService,
    private broadcast: JhiEventManager
  ) {}

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    this.commandService.listenTotalCount().subscribe(quantity => {
      console.log(quantity);
      this.numberOfItems = quantity;
    });

    // Checking if existing Card (linked to account)
    // For connection
    this.broadcast.subscribe('loginCallback', msg => {
      if (msg.content === 'ok') {
        console.log('DANS CALLBACK TOOLBAR :', msg);
        console.log('this.accountService.userIdentityId', this.accountService.userIdentityId);
        this.commandService.hasCart(this.accountService.userIdentityId).subscribe(msg2 => {
          console.log('HAS CART ?', msg2);
          if (msg2.body[0] !== null) {
            console.log('dans ngOnInit msg  ->', msg2);
            this.commandService.reloadCart(msg2.body[0].orderItems);
          }
        });
      }
    });

    // For reload
    this.accountService.identity().then(account => {
      this.currentAccount = account;
      console.log('MSG :', account.login);
      this.commandService.hasCart(this.accountService.userIdentityId).subscribe(msg => {
        console.log('HAS CART ?', msg);
        this.commandService.getCart;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.commandService.emptyCart();
    this.router.navigate(['']).then(r => console.log(r));
  }

  openConnectDialog(): void {
    this.dialogConnect.open(DialogConnectComponent);
  }
}
