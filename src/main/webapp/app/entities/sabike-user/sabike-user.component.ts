import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISABIKEUser } from 'app/shared/model/sabike-user.model';
import { AccountService } from 'app/core';
import { SABIKEUserService } from './sabike-user.service';

@Component({
  selector: 'jhi-sabike-user',
  templateUrl: './sabike-user.component.html'
})
export class SABIKEUserComponent implements OnInit, OnDestroy {
  sABIKEUsers: ISABIKEUser[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sABIKEUserService: SABIKEUserService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sABIKEUserService
      .query()
      .pipe(
        filter((res: HttpResponse<ISABIKEUser[]>) => res.ok),
        map((res: HttpResponse<ISABIKEUser[]>) => res.body)
      )
      .subscribe(
        (res: ISABIKEUser[]) => {
          this.sABIKEUsers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSABIKEUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISABIKEUser) {
    return item.id;
  }

  registerChangeInSABIKEUsers() {
    this.eventSubscriber = this.eventManager.subscribe('sABIKEUserListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
