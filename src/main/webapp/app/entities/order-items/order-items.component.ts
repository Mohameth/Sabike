import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderItems } from 'app/shared/model/order-items.model';
import { AccountService } from 'app/core';
import { OrderItemsService } from './order-items.service';

@Component({
  selector: 'jhi-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit, OnDestroy {
  orderItems: IOrderItems[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected orderItemsService: OrderItemsService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.orderItemsService
      .query()
      .pipe(
        filter((res: HttpResponse<IOrderItems[]>) => res.ok),
        map((res: HttpResponse<IOrderItems[]>) => res.body)
      )
      .subscribe(
        (res: IOrderItems[]) => {
          this.orderItems = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOrderItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOrderItems) {
    return item.id;
  }

  registerChangeInOrderItems() {
    this.eventSubscriber = this.eventManager.subscribe('orderItemsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
