import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISABIKECart, SABIKECart } from 'app/shared/model/sabike-cart.model';
import { SABIKECartService } from './sabike-cart.service';
import { ISABIKEUser } from 'app/shared/model/sabike-user.model';
import { SABIKEUserService } from 'app/entities/sabike-user';
import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';
import { SABIKEArticleService } from 'app/entities/sabike-article';

@Component({
  selector: 'jhi-sabike-cart-update',
  templateUrl: './sabike-cart-update.component.html'
})
export class SABIKECartUpdateComponent implements OnInit {
  isSaving: boolean;

  userids: ISABIKEUser[];

  sabikearticles: ISABIKEArticle[];

  editForm = this.fb.group({
    id: [],
    cartId: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected sABIKECartService: SABIKECartService,
    protected sABIKEUserService: SABIKEUserService,
    protected sABIKEArticleService: SABIKEArticleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sABIKECart }) => {
      this.updateForm(sABIKECart);
    });
    this.sABIKEUserService
      .query({ filter: 'cartid-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ISABIKEUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISABIKEUser[]>) => response.body)
      )
      .subscribe(
        (res: ISABIKEUser[]) => {
          if (!this.editForm.get('userId').value || !this.editForm.get('userId').value.id) {
            this.userids = res;
          } else {
            this.sABIKEUserService
              .find(this.editForm.get('userId').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ISABIKEUser>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ISABIKEUser>) => subResponse.body)
              )
              .subscribe(
                (subRes: ISABIKEUser) => (this.userids = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.sABIKEArticleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISABIKEArticle[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISABIKEArticle[]>) => response.body)
      )
      .subscribe((res: ISABIKEArticle[]) => (this.sabikearticles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sABIKECart: ISABIKECart) {
    this.editForm.patchValue({
      id: sABIKECart.id,
      cartId: sABIKECart.cartId,
      userId: sABIKECart.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sABIKECart = this.createFromForm();
    if (sABIKECart.id !== undefined) {
      this.subscribeToSaveResponse(this.sABIKECartService.update(sABIKECart));
    } else {
      this.subscribeToSaveResponse(this.sABIKECartService.create(sABIKECart));
    }
  }

  private createFromForm(): ISABIKECart {
    return {
      ...new SABIKECart(),
      id: this.editForm.get(['id']).value,
      cartId: this.editForm.get(['cartId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISABIKECart>>) {
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

  trackSABIKEUserById(index: number, item: ISABIKEUser) {
    return item.id;
  }

  trackSABIKEArticleById(index: number, item: ISABIKEArticle) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
