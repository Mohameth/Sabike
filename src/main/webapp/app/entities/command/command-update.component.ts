import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICommand, Command } from 'app/shared/model/command.model';
import { CommandService } from './command.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
  selector: 'jhi-command-update',
  templateUrl: './command-update.component.html'
})
export class CommandUpdateComponent implements OnInit {
  isSaving: boolean;

  clients: IClient[];
  orderDateDp: any;

  editForm = this.fb.group({
    id: [],
    state: [],
    orderDate: [],
    totalAmount: [],
    paymentDate: [],
    client: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected commandService: CommandService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ command }) => {
      this.updateForm(command);
    });
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClient[]>) => response.body)
      )
      .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(command: ICommand) {
    this.editForm.patchValue({
      id: command.id,
      state: command.state,
      orderDate: command.orderDate,
      totalAmount: command.totalAmount,
      paymentDate: command.paymentDate != null ? command.paymentDate.format(DATE_TIME_FORMAT) : null,
      client: command.client
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const command = this.createFromForm();
    if (command.id !== undefined) {
      this.subscribeToSaveResponse(this.commandService.update(command));
    } else {
      this.subscribeToSaveResponse(this.commandService.create(command));
    }
  }

  private createFromForm(): ICommand {
    return {
      ...new Command(),
      id: this.editForm.get(['id']).value,
      state: this.editForm.get(['state']).value,
      orderDate: this.editForm.get(['orderDate']).value,
      totalAmount: this.editForm.get(['totalAmount']).value,
      paymentDate:
        this.editForm.get(['paymentDate']).value != null ? moment(this.editForm.get(['paymentDate']).value, DATE_TIME_FORMAT) : undefined,
      client: this.editForm.get(['client']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommand>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackClientById(index: number, item: IClient) {
    return item.id;
  }
}
