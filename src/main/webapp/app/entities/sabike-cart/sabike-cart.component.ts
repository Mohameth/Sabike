import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISABIKECart } from 'app/shared/model/sabike-cart.model';
import { AccountService } from 'app/core';
import { SABIKECartService } from './sabike-cart.service';

@Component({
  selector: 'jhi-sabike-cart',
  templateUrl: './sabike-cart.component.html'
})
export class SABIKECartComponent implements OnInit, OnDestroy {
  sABIKECarts: ISABIKECart[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sABIKECartService: SABIKECartService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sABIKECartService
      .query()
      .pipe(
        filter((res: HttpResponse<ISABIKECart[]>) => res.ok),
        map((res: HttpResponse<ISABIKECart[]>) => res.body)
      )
      .subscribe(
        (res: ISABIKECart[]) => {
          this.sABIKECarts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSABIKECarts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISABIKECart) {
    return item.id;
  }

  registerChangeInSABIKECarts() {
    this.eventSubscriber = this.eventManager.subscribe('sABIKECartListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
