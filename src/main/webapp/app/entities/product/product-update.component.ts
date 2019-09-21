import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

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
    partCategoryType: [],
    description: []
  });

  constructor(protected productService: ProductService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
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
      partCategoryType: product.partCategoryType,
      description: product.description
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
      partCategoryType: this.editForm.get(['partCategoryType']).value,
      description: this.editForm.get(['description']).value
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
}
