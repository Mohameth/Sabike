import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICommand } from 'app/shared/model/command.model';
import { AccountService } from 'app/core';
import { CommandService } from './command.service';

@Component({
  selector: 'jhi-command',
  templateUrl: './command.component.html'
})
export class CommandComponent implements OnInit, OnDestroy {
  commands: ICommand[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected commandService: CommandService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.commandService
      .query()
      .pipe(
        filter((res: HttpResponse<ICommand[]>) => res.ok),
        map((res: HttpResponse<ICommand[]>) => res.body)
      )
      .subscribe(
        (res: ICommand[]) => {
          this.commands = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCommands();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICommand) {
    return item.id;
  }

  registerChangeInCommands() {
    this.eventSubscriber = this.eventManager.subscribe('commandListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
