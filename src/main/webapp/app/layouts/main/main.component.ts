import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { RouterEventService } from 'app/sabike/services/routerEvent.service';
import { JhiEventManager } from 'ng-jhipster';
import { Account, AccountService } from 'app/core';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  private currentAccount: Account;

  constructor(
    private titleService: Title,
    private router: Router,
    private routerEventService: RouterEventService,
    private accountService: AccountService
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'sabikeApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      // this.routerEventService.handleEvents(this.router.events);
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
        this.routerEventService.handleNavigationEndEvent(event);
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.accountService.identity().then((account: Account) => {
      this.currentAccount = account;
    });
  }
}
