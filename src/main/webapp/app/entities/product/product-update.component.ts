import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { IOrderItems } from 'app/shared/model/order-items.model';
import { OrderItemsService } from 'app/entities/order-items';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  orderitems: IOrderItems[];

  editForm = this.fb.group({
    id: [],
    price: [],
    name: [],
    stock: [],
    picture: [],
    brand: [],
    type: [],
    bikeCategory: [],
    bikeSize: [],
    bikeSeeds: [],
    bikeColor: [],
    partCategory: [],
    partCategoryType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected orderItemsService: OrderItemsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.orderItemsService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrderItems[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrderItems[]>) => response.body)
      )
      .subscribe((res: IOrderItems[]) => (this.orderitems = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      price: product.price,
      name: product.name,
      stock: product.stock,
      picture: product.picture,
      brand: product.brand,
      type: product.type,
      bikeCategory: product.bikeCategory,
      bikeSize: product.bikeSize,
      bikeSeeds: product.bikeSeeds,
      bikeColor: product.bikeColor,
      partCategory: product.partCategory,
      partCategoryType: product.partCategoryType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      price: this.editForm.get(['price']).value,
      name: this.editForm.get(['name']).value,
      stock: this.editForm.get(['stock']).value,
      picture: this.editForm.get(['picture']).value,
      brand: this.editForm.get(['brand']).value,
      type: this.editForm.get(['type']).value,
      bikeCategory: this.editForm.get(['bikeCategory']).value,
      bikeSize: this.editForm.get(['bikeSize']).value,
      bikeSeeds: this.editForm.get(['bikeSeeds']).value,
      bikeColor: this.editForm.get(['bikeColor']).value,
      partCategory: this.editForm.get(['partCategory']).value,
      partCategoryType: this.editForm.get(['partCategoryType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
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

  trackOrderItemsById(index: number, item: IOrderItems) {
    return item.id;
  }
}
