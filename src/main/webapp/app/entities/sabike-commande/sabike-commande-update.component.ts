import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ISABIKECommande, SABIKECommande } from 'app/shared/model/sabike-commande.model';
import { SABIKECommandeService } from './sabike-commande.service';

@Component({
  selector: 'jhi-sabike-commande-update',
  templateUrl: './sabike-commande-update.component.html'
})
export class SABIKECommandeUpdateComponent implements OnInit {
  isSaving: boolean;
  orderDateDp: any;

  editForm = this.fb.group({
    id: [],
    orderId: [],
    number: [],
    status: [],
    orderDate: [],
    orderItems: []
  });

  constructor(protected sABIKECommandeService: SABIKECommandeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sABIKECommande }) => {
      this.updateForm(sABIKECommande);
    });
  }

  updateForm(sABIKECommande: ISABIKECommande) {
    this.editForm.patchValue({
      id: sABIKECommande.id,
      orderId: sABIKECommande.orderId,
      number: sABIKECommande.number,
      status: sABIKECommande.status,
      orderDate: sABIKECommande.orderDate,
      orderItems: sABIKECommande.orderItems
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sABIKECommande = this.createFromForm();
    if (sABIKECommande.id !== undefined) {
      this.subscribeToSaveResponse(this.sABIKECommandeService.update(sABIKECommande));
    } else {
      this.subscribeToSaveResponse(this.sABIKECommandeService.create(sABIKECommande));
    }
  }

  private createFromForm(): ISABIKECommande {
    return {
      ...new SABIKECommande(),
      id: this.editForm.get(['id']).value,
      orderId: this.editForm.get(['orderId']).value,
      number: this.editForm.get(['number']).value,
      status: this.editForm.get(['status']).value,
      orderDate: this.editForm.get(['orderDate']).value,
      orderItems: this.editForm.get(['orderItems']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISABIKECommande>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
