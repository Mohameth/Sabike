import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { OrderItemsService } from './order-items.service';
import { ICommand } from 'app/shared/model/command.model';
import { CommandService } from 'app/entities/command';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
  selector: 'jhi-order-items-update',
  templateUrl: './order-items-update.component.html'
})
export class OrderItemsUpdateComponent implements OnInit {
  isSaving: boolean;

  commands: ICommand[];

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    paidPrice: [],
    command: [],
    product: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderItemsService: OrderItemsService,
    protected commandService: CommandService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderItems }) => {
      this.updateForm(orderItems);
    });
    this.commandService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommand[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommand[]>) => response.body)
      )
      .subscribe((res: ICommand[]) => (this.commands = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(orderItems: IOrderItems) {
    this.editForm.patchValue({
      id: orderItems.id,
      quantity: orderItems.quantity,
      paidPrice: orderItems.paidPrice,
      command: orderItems.command,
      product: orderItems.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderItems = this.createFromForm();
    if (orderItems.id !== undefined) {
      this.subscribeToSaveResponse(this.orderItemsService.update(orderItems));
    } else {
      this.subscribeToSaveResponse(this.orderItemsService.create(orderItems));
    }
  }

  private createFromForm(): IOrderItems {
    return {
      ...new OrderItems(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      paidPrice: this.editForm.get(['paidPrice']).value,
      command: this.editForm.get(['command']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderItems>>) {
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

  trackCommandById(index: number, item: ICommand) {
    return item.id;
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
