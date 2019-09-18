import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { MatDialog } from '@angular/material';
import { DialogConnectComponent } from 'app/sabike/components/dialog-connect/dialog-connect.component';
// Services
import { AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
// Misc
import { VERSION } from 'app/app.constants';
import { CommandService } from 'app/entities/command';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  numberOfItems = 0;
  currentAccount: any;

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private dialogConnect: MatDialog,
    private commandService: CommandService,
    private broadcast: JhiEventManager
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    this.commandService.listenTotalCount().subscribe(quantity => {
      console.log(quantity);
      this.numberOfItems = quantity;
    });

    this.broadcast.subscribe('loginCallback', msg => {
      if (msg.content === 'ok') {
        console.log('DANS CALLBACK TOOLBAR :', msg);
        console.log('this.accountService.userIdentityId', this.accountService.userIdentityId);
        this.commandService.hasCart(this.accountService.userIdentityId).subscribe(msg2 => {
          console.log('HAS CART ?', msg2);
          if (msg2.body !== []) {
            this.commandService.reloadCart(msg2.body[0].orderItems);
          }
        });
      }
    });

    this.accountService.identity().then(account => {
      this.currentAccount = account;
      console.log('MSG :', account.login);
      this.commandService.hasCart(this.accountService.userIdentityId).subscribe(msg => {
        console.log('HAS CART ?', msg);
        this.commandService.getCart;
      });
    });
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  // login() {
  //   this.modalRef = this.loginModalService.open();
  // }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.commandService.emptyCart();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }

  openConnectDialog(): void {
    const dialogRef = this.dialogConnect.open(DialogConnectComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
