import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';
import { AccountService } from 'app/core';
import { SABIKEArticleService } from './sabike-article.service';

@Component({
  selector: 'jhi-sabike-article',
  templateUrl: './sabike-article.component.html'
})
export class SABIKEArticleComponent implements OnInit, OnDestroy {
  sABIKEArticles: ISABIKEArticle[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sABIKEArticleService: SABIKEArticleService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sABIKEArticleService
      .query()
      .pipe(
        filter((res: HttpResponse<ISABIKEArticle[]>) => res.ok),
        map((res: HttpResponse<ISABIKEArticle[]>) => res.body)
      )
      .subscribe(
        (res: ISABIKEArticle[]) => {
          this.sABIKEArticles = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSABIKEArticles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISABIKEArticle) {
    return item.id;
  }

  registerChangeInSABIKEArticles() {
    this.eventSubscriber = this.eventManager.subscribe('sABIKEArticleListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
