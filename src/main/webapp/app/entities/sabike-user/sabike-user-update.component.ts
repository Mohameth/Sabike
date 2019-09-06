import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISABIKEUser, SABIKEUser } from 'app/shared/model/sabike-user.model';
import { SABIKEUserService } from './sabike-user.service';
import { ISABIKECart } from 'app/shared/model/sabike-cart.model';
import { SABIKECartService } from 'app/entities/sabike-cart';
import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';
import { SABIKECommandeService } from 'app/entities/sabike-commande';

@Component({
  selector: 'jhi-sabike-user-update',
  templateUrl: './sabike-user-update.component.html'
})
export class SABIKEUserUpdateComponent implements OnInit {
  isSaving: boolean;

  sabikecarts: ISABIKECart[];

  sabikecommandes: ISABIKECommande[];

  editForm = this.fb.group({
    id: [],
    userId: [],
    password: [],
    email: [],
    first: [],
    last: [],
    isAdmin: [],
    deliveryAddressNumber: [],
    deliveryAddressStreet: [],
    deliveryAddressCity: [],
    deliveryAddressPostalCode: [],
    deliveryAddressCountry: [],
    billingAddressNumber: [],
    billingAddressStreet: [],
    billingAddressCity: [],
    billingAddressPostalCode: [],
    billingAddressCountry: [],
    orderId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected sABIKEUserService: SABIKEUserService,
    protected sABIKECartService: SABIKECartService,
    protected sABIKECommandeService: SABIKECommandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sABIKEUser }) => {
      this.updateForm(sABIKEUser);
    });
    this.sABIKECartService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISABIKECart[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISABIKECart[]>) => response.body)
      )
      .subscribe((res: ISABIKECart[]) => (this.sabikecarts = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.sABIKECommandeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISABIKECommande[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISABIKECommande[]>) => response.body)
      )
      .subscribe((res: ISABIKECommande[]) => (this.sabikecommandes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sABIKEUser: ISABIKEUser) {
    this.editForm.patchValue({
      id: sABIKEUser.id,
      userId: sABIKEUser.userId,
      password: sABIKEUser.password,
      email: sABIKEUser.email,
      first: sABIKEUser.first,
      last: sABIKEUser.last,
      isAdmin: sABIKEUser.isAdmin,
      deliveryAddressNumber: sABIKEUser.deliveryAddressNumber,
      deliveryAddressStreet: sABIKEUser.deliveryAddressStreet,
      deliveryAddressCity: sABIKEUser.deliveryAddressCity,
      deliveryAddressPostalCode: sABIKEUser.deliveryAddressPostalCode,
      deliveryAddressCountry: sABIKEUser.deliveryAddressCountry,
      billingAddressNumber: sABIKEUser.billingAddressNumber,
      billingAddressStreet: sABIKEUser.billingAddressStreet,
      billingAddressCity: sABIKEUser.billingAddressCity,
      billingAddressPostalCode: sABIKEUser.billingAddressPostalCode,
      billingAddressCountry: sABIKEUser.billingAddressCountry,
      orderId: sABIKEUser.orderId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sABIKEUser = this.createFromForm();
    if (sABIKEUser.id !== undefined) {
      this.subscribeToSaveResponse(this.sABIKEUserService.update(sABIKEUser));
    } else {
      this.subscribeToSaveResponse(this.sABIKEUserService.create(sABIKEUser));
    }
  }

  private createFromForm(): ISABIKEUser {
    return {
      ...new SABIKEUser(),
      id: this.editForm.get(['id']).value,
      userId: this.editForm.get(['userId']).value,
      password: this.editForm.get(['password']).value,
      email: this.editForm.get(['email']).value,
      first: this.editForm.get(['first']).value,
      last: this.editForm.get(['last']).value,
      isAdmin: this.editForm.get(['isAdmin']).value,
      deliveryAddressNumber: this.editForm.get(['deliveryAddressNumber']).value,
      deliveryAddressStreet: this.editForm.get(['deliveryAddressStreet']).value,
      deliveryAddressCity: this.editForm.get(['deliveryAddressCity']).value,
      deliveryAddressPostalCode: this.editForm.get(['deliveryAddressPostalCode']).value,
      deliveryAddressCountry: this.editForm.get(['deliveryAddressCountry']).value,
      billingAddressNumber: this.editForm.get(['billingAddressNumber']).value,
      billingAddressStreet: this.editForm.get(['billingAddressStreet']).value,
      billingAddressCity: this.editForm.get(['billingAddressCity']).value,
      billingAddressPostalCode: this.editForm.get(['billingAddressPostalCode']).value,
      billingAddressCountry: this.editForm.get(['billingAddressCountry']).value,
      orderId: this.editForm.get(['orderId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISABIKEUser>>) {
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

  trackSABIKECartById(index: number, item: ISABIKECart) {
    return item.id;
  }

  trackSABIKECommandeById(index: number, item: ISABIKECommande) {
    return item.id;
  }
}
