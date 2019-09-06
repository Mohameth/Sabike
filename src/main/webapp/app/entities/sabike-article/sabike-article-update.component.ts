import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISABIKEArticle, SABIKEArticle } from 'app/shared/model/sabike-article.model';
import { SABIKEArticleService } from './sabike-article.service';
import { ISABIKECart } from 'app/shared/model/sabike-cart.model';
import { SABIKECartService } from 'app/entities/sabike-cart';

@Component({
  selector: 'jhi-sabike-article-update',
  templateUrl: './sabike-article-update.component.html'
})
export class SABIKEArticleUpdateComponent implements OnInit {
  isSaving: boolean;

  sabikecarts: ISABIKECart[];

  editForm = this.fb.group({
    id: [],
    articleId: [],
    price: [],
    name: [],
    stock: [],
    picture: [],
    cartIds: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected sABIKEArticleService: SABIKEArticleService,
    protected sABIKECartService: SABIKECartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sABIKEArticle }) => {
      this.updateForm(sABIKEArticle);
    });
    this.sABIKECartService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISABIKECart[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISABIKECart[]>) => response.body)
      )
      .subscribe((res: ISABIKECart[]) => (this.sabikecarts = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(sABIKEArticle: ISABIKEArticle) {
    this.editForm.patchValue({
      id: sABIKEArticle.id,
      articleId: sABIKEArticle.articleId,
      price: sABIKEArticle.price,
      name: sABIKEArticle.name,
      stock: sABIKEArticle.stock,
      picture: sABIKEArticle.picture,
      cartIds: sABIKEArticle.cartIds
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sABIKEArticle = this.createFromForm();
    if (sABIKEArticle.id !== undefined) {
      this.subscribeToSaveResponse(this.sABIKEArticleService.update(sABIKEArticle));
    } else {
      this.subscribeToSaveResponse(this.sABIKEArticleService.create(sABIKEArticle));
    }
  }

  private createFromForm(): ISABIKEArticle {
    return {
      ...new SABIKEArticle(),
      id: this.editForm.get(['id']).value,
      articleId: this.editForm.get(['articleId']).value,
      price: this.editForm.get(['price']).value,
      name: this.editForm.get(['name']).value,
      stock: this.editForm.get(['stock']).value,
      picture: this.editForm.get(['picture']).value,
      cartIds: this.editForm.get(['cartIds']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISABIKEArticle>>) {
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
