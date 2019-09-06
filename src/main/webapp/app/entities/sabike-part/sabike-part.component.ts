import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISABIKEPart } from 'app/shared/model/sabike-part.model';
import { AccountService } from 'app/core';
import { SABIKEPartService } from './sabike-part.service';

@Component({
  selector: 'jhi-sabike-part',
  templateUrl: './sabike-part.component.html'
})
export class SABIKEPartComponent implements OnInit, OnDestroy {
  sABIKEParts: ISABIKEPart[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sABIKEPartService: SABIKEPartService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sABIKEPartService
      .query()
      .pipe(
        filter((res: HttpResponse<ISABIKEPart[]>) => res.ok),
        map((res: HttpResponse<ISABIKEPart[]>) => res.body)
      )
      .subscribe(
        (res: ISABIKEPart[]) => {
          this.sABIKEParts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSABIKEParts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISABIKEPart) {
    return item.id;
  }

  registerChangeInSABIKEParts() {
    this.eventSubscriber = this.eventManager.subscribe('sABIKEPartListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
