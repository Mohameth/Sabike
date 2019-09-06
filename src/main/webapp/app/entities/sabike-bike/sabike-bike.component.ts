import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISABIKEBike } from 'app/shared/model/sabike-bike.model';
import { AccountService } from 'app/core';
import { SABIKEBikeService } from './sabike-bike.service';

@Component({
  selector: 'jhi-sabike-bike',
  templateUrl: './sabike-bike.component.html'
})
export class SABIKEBikeComponent implements OnInit, OnDestroy {
  sABIKEBikes: ISABIKEBike[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sABIKEBikeService: SABIKEBikeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sABIKEBikeService
      .query()
      .pipe(
        filter((res: HttpResponse<ISABIKEBike[]>) => res.ok),
        map((res: HttpResponse<ISABIKEBike[]>) => res.body)
      )
      .subscribe(
        (res: ISABIKEBike[]) => {
          this.sABIKEBikes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSABIKEBikes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISABIKEBike) {
    return item.id;
  }

  registerChangeInSABIKEBikes() {
    this.eventSubscriber = this.eventManager.subscribe('sABIKEBikeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
