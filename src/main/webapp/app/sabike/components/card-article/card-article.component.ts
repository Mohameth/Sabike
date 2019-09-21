import { Component, Input, OnInit } from '@angular/core';
import { IProduct, Product } from 'app/shared/model/product.model';
import { CartService } from 'app/entities/cart';
import { ProductService } from 'app/entities/product';
import { timer } from 'rxjs';
import { CommandService } from 'app/entities/command';
import { OrderItemsService } from 'app/entities/order-items';
import { AccountService } from 'app/core';
import { ClientService } from 'app/entities/client';
import { IClient } from 'app/shared/model/client.model';
import { Command, ICommand, OrderState } from 'app/shared/model/command.model';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { error } from 'util';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: Product;

  private i_product: IProduct; // TODO virer le doublon
  isDisabled = false;
  isInStock = 'In stock';

  constructor(private productService: ProductService, private commandService: CommandService, private eventManager: JhiEventManager) {
    //
  }

  ngOnInit() {
    this.productService.find(this.product.id).subscribe(message => {
      this.i_product = message.body;
      // now we can decrease
      if (this.i_product.stock === 0) {
        console.log('++++++ NOPE ++++++');
        this.isInStock = 'Out of stock';
        this.isDisabled = true;
      }
    });
  }

  addToCart(productId: number) {
    // Here in this component the quantity is always one
    this.productService
      .find(productId)
      .toPromise()
      .then(product => {
        // TODO debug ProductRepositoty.requestProductQuantity or just reload all product..
        console.log(product.body.stock);
        this.i_product = product.body;
        // now we can decrease
        if (this.i_product.stock === 0) {
          // NOpe
          this.isDisabled = true;
          this.isInStock = 'Out of stock';
        } else {
          // TODO use new function by @Denis
          // TODO also... before reserving quantity we should check if there is already 5 times the same product
          // TODO move this before checking product availability
          // TODO => when we enter the method addToCart(productId: number, quantity: number)
          if (this.commandService.hasLessThanFive(productId)) {
            this.i_product.stock = this.i_product.stock - 1;
            this.productService.reserveQuantityProduct(this.i_product).subscribe(response => {
              this.commandService.manageTimer();
              this.commandService.updateCartProduct(this.i_product, 1);
            });
          } else {
            // already 5
            this.eventManager.broadcast({
              name: 'popSnack',
              content: {
                message: 'Already 5 ' + this.i_product.name + ' in the cart.',
                action: 'DISMISS'
              }
            });
          }
        }
      })
      .catch(error => console.log(error));
  }
}
