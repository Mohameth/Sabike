import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { NavigationService } from 'app/sabike/services/navigation-service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private navigationService: NavigationService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  openMenu(menu: string) {
    switch (menu) {
      case 'bikes':
        this.navigationService.selectVelos('bikes');
        break;
      case 'parts':
        this.navigationService.selectVelos('parts');
        break;
    }
  }

  openBikesMenu() {
    this.navigationService.selectVelos('bikes');
  }

  openPartsMenu() {
    this.navigationService.selectVelos('parts');
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
}
