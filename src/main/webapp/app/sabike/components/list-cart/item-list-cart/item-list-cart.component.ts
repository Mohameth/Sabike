import { Component, Input, OnInit } from '@angular/core';
import { OrderItems } from 'app/shared/model/order-items.model';
import { CommandService } from 'app/entities/command';
import { ProductService } from 'app/entities/product';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'jhi-item-list-cart',
  templateUrl: './item-list-cart.component.html',
  styleUrls: ['./item-list-cart.component.scss']
})
export class ItemListCartComponent implements OnInit {
  selectedQuantity = '1'; // default
  private snackPopper = new Subject<String>();
  isOutOfStock = false;

  @Input() orderItem: OrderItems;

  constructor(private commandService: CommandService, private productService: ProductService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.selectedQuantity = this.orderItem.quantity.toString();
  }

  changeQuantity($newQuantity: any) {
    this.productService
      .updateQuantityProduct(this.orderItem.product, this.orderItem.quantity, Number($newQuantity))
      .then(updatedProduct => {
        this.commandService.updateToCart(this.orderItem.product, Number($newQuantity), true);
        this.orderItem.quantity = Number($newQuantity);
      })
      .catch(e => {
        this.selectedQuantity = this.orderItem.quantity.toString();
        this.isOutOfStock = true;
        this.popSnack(e);
        this.popSnackListener().subscribe(next => {
          this.openSnackBar(e, 'DISMISS');
        });
      });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  private popSnack(msg: String) {
    this.snackPopper.next(msg);
  }

  public popSnackListener(): Observable<String> {
    return this.snackPopper.asObservable();
  }

  deleteFromCart() {
    this.commandService.removeFromCart(this.orderItem);
  }
}
