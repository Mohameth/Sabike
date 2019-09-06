import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';
import { AccountService } from 'app/core';
import { SABIKECommandeService } from './sabike-commande.service';

@Component({
  selector: 'jhi-sabike-commande',
  templateUrl: './sabike-commande.component.html'
})
export class SABIKECommandeComponent implements OnInit, OnDestroy {
  sABIKECommandes: ISABIKECommande[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sABIKECommandeService: SABIKECommandeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sABIKECommandeService
      .query()
      .pipe(
        filter((res: HttpResponse<ISABIKECommande[]>) => res.ok),
        map((res: HttpResponse<ISABIKECommande[]>) => res.body)
      )
      .subscribe(
        (res: ISABIKECommande[]) => {
          this.sABIKECommandes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSABIKECommandes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISABIKECommande) {
    return item.id;
  }

  registerChangeInSABIKECommandes() {
    this.eventSubscriber = this.eventManager.subscribe('sABIKECommandeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
